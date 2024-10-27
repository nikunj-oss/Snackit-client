import { useEffect, useState } from "react";
import restaurantFormSchema from "./Schema/formSchema";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useCreateRestaurantMutation, useGetMyRestaurantQuery, useUpdateMyRestaurantMutation } from "../../redux/api";
import toast from "react-hot-toast";
import cuisine from "../../../constants/constants";

const ManageRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState(null);
    const [restaurantImagePreview,setRestaurantImagePreview]=useState(null)
    const [menuItemImage,setMenuItemImage]=useState([])

    // Fetch the token and store it in the state
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const fetchedToken = await getAccessTokenSilently();
                setToken(fetchedToken);  // Save token in the state
            } catch (e) {
                console.error("Error fetching token", e);
            }
        };
        fetchToken();
    }, [getAccessTokenSilently]);

    const [createRestaurant] = useCreateRestaurantMutation();
    const [updateMyRestaurant]=useUpdateMyRestaurantMutation();
    const { data: restaurantData, isLoading } = useGetMyRestaurantQuery({ token }, { skip: !token });
    const [formData, setFormData] = useState(restaurantFormSchema);
    const [errors, setErrors] = useState({});

    const update=async(url)=>{
        const response = await fetch(url);
         const blob = await response.blob();
         const file = new File([blob], 'restaurantImage.png', { type: blob.type });
         return file
    }

    useEffect(() => {
        if (restaurantData) {
            let cuisines;
            if (Array.isArray(restaurantData.cuisines)) {
                // If cuisines is an array, no need to parse, just use it as is
                cuisines = restaurantData.cuisines
            } else {
                try {
                    // If it's not an array, try parsing it as a string
                    cuisines = JSON.parse(restaurantData.cuisines || "[]");
                } catch (e) {
                    // If parsing fails, set cuisines to an empty array
                    console.error("Failed to parse cuisines:", e);
                    cuisines = [];
                }
            }
    
            setFormData({
                ...restaurantFormSchema,
                ...restaurantData,
                cuisines,
                restaurantImage:update(restaurantData.imageUrl)

            });
    
            if (restaurantData.imageUrl) {
                setRestaurantImagePreview(restaurantData.imageUrl);
            }
    
            if (restaurantData.menuItems) {
                const previews = restaurantData.menuItems.map(item => item.image);
                setMenuItemImage(previews);
            }
        }
    }, [restaurantData]);
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => {
                const cuisines = checked
                    ? [...prev.cuisines, value]
                    : prev.cuisines.filter((cuisine) => cuisine !== value);
                return { ...prev, cuisines };
            });
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const prepareFormData = async (formData) => {
        const data = new FormData();
    
        // Helper function to ensure HTTPS in URLs
        const ensureHttps = (url) => {
            if (url.startsWith('http://')) {
                return url.replace('http://', 'https://');
            }
            return url;
        };
    
        // Handle restaurant image: Convert URL to File if necessary and ensure HTTPS
        if (formData.restaurantImage && typeof formData.restaurantImage === 'string') {
            const restaurantImageUrl = ensureHttps(formData.restaurantImage);
            const response = await fetch(restaurantImageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'restaurantImage.png', { type: blob.type });
            data.append('restaurantImage', file);
        } else {
            data.append('restaurantImage', formData.restaurantImage); // If it's already a file
        }
    
        // Append basic restaurant details
        data.append('restaurantName', formData.restaurantName.trim());
        data.append('city', formData.city.trim());
        data.append('country', formData.country.trim());
        data.append('deliveryPrice', parseFloat(formData.deliveryPrice));
        data.append('deliveryTime', parseInt(formData.deliveryTime, 10));
        data.append('cuisines', JSON.stringify(formData.cuisines));
    
        // Handle menu items and their images, ensuring HTTPS
        for (const [index, menuItem] of formData.menuItems.entries()) {
            data.append(`menuItems[${index}][name]`, menuItem.name.trim());
            data.append(`menuItems[${index}][price]`, parseFloat(menuItem.price));
    
            if (menuItem.image && typeof menuItem.image === 'string') {
                // Ensure HTTPS for menu item image URL
                const menuImageUrl = ensureHttps(menuItem.image);
                const response = await fetch(menuImageUrl);
                const blob = await response.blob();
                const file = new File([blob], `menu${index}.png`, { type: blob.type });
                data.append('menuImages', file);
            } else if (menuItem.image) {
                data.append('menuImages', menuItem.image); // If it's already a file
            }
        }
    
        return data;
    };
    
    
    

    const handleMenuItemChange = (index, field, value) => {
        const newMenuItems = [...formData.menuItems];
        newMenuItems[index][field] =
            field === "image" ? value.target.files[0] : value.target.value;

        setFormData((prev) => ({
            ...prev,
            menuItems: newMenuItems,
        }));

        if (field === "name") {
            setErrors((prev) => ({ ...prev, [`menuItemName_${index}`]: undefined }));
        } else if (field === "price") {
            setErrors((prev) => ({ ...prev, [`menuItemPrice_${index}`]: undefined }));
        }
    };

    const addMenuItem = () => {
        setFormData((prev) => ({
            ...prev,
            menuItems: [...prev.menuItems, { name: "", price: "", image: null }],
        }));
    };

    const removeMenuItem = (index) => {
        const newMenuItems = formData.menuItems.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            menuItems: newMenuItems,
        }));
    };

    const handleRestaurantImageChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            restaurantImage: e.target.files[0],
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.restaurantName) newErrors.restaurantName = "Restaurant Name is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.deliveryPrice || formData.deliveryPrice <= 0) newErrors.deliveryPrice = "Delivery Price must be positive";
        if (!formData.deliveryTime || formData.deliveryTime <= 0) newErrors.deliveryTime = "Delivery Time must be positive";
        if (formData.menuItems.length === 0) newErrors.menuItems = "At least one menu item is required";
        if (formData.cuisines.length === 0) newErrors.cuisines = "At least one cuisine item is required";

        formData.menuItems.forEach((item, index) => {
            if (!item.name) newErrors[`menuItemName_${index}`] = "Name is required";
            if (!item.price || item.price <= 0) newErrors[`menuItemPrice_${index}`] = "Price must be positive";
        });

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

    
        const data = await prepareFormData(formData); // Wait for the FormData preparation
    
        // Send request
        try {
            await (restaurantData ? updateMyRestaurant({ data, token }) : createRestaurant({ data, token }));
            setErrors({});
            toast.success("Restaurant Created Successfully");
        } catch (error) {
            console.error("Error creating restaurant", error);
            toast.error("Error creating Restaurant, try later");
        }
    };
    

    if (isLoading) {
        return <div>Loading......</div>;
    }

  

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
            <div className="mb-4">
                <h1 className="text-2xl font-semibold mb-2">Restaurant Details</h1>
                <p className="text-gray-600 mb-4">Enter the details about your restaurant</p>

                <div className="mb-4">
                    {
                        restaurantImagePreview && (
                            <img src={restaurantImagePreview} alt="Restaurant Preview" className="mb-2 w-full h-32 object-cover rounded"/>
                        )
                    }
                    <label className="block font-semibold">Restaurant Image</label>
                    <input
                        type="file"
                        className="w-full p-2 border rounded mt-1"
                        onChange={handleRestaurantImageChange}
                        accept="image/*"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Restaurant Name</label>
                    <input
                        className="w-full p-2 border rounded mt-1"
                        name="restaurantName"
                        type="text"
                        onChange={handleChange}
                        value={formData.restaurantName}
                    />
                    {errors.restaurantName && <p className="text-red-500">{errors.restaurantName}</p>}
                </div>

                <div className="flex gap-4 mb-4">
                    <div className="w-1/2">
                        <label className="block font-semibold">City</label>
                        <input
                            className="w-full p-2 border rounded mt-1"
                            name="city"
                            type="text"
                            onChange={handleChange}
                            value={formData.city}
                        />
                        {errors.city && <p className="text-red-500">{errors.city}</p>}
                    </div>
                    <div className="w-1/2">
                        <label className="block font-semibold">Country</label>
                        <input
                            className="w-full p-2 border rounded mt-1"
                            name="country"
                            type="text"
                            onChange={handleChange}
                            value={formData.country}
                        />
                        {errors.country && <p className="text-red-500">{errors.country}</p>}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Delivery Price</label>
                    <input
                        className="w-full p-2 border rounded mt-1"
                        name="deliveryPrice"
                        type="number"
                        onChange={handleChange}
                        value={formData.deliveryPrice}
                    />
                    {errors.deliveryPrice && <p className="text-red-500">{errors.deliveryPrice}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Delivery Time</label>
                    <input
                        className="w-full p-2 border rounded mt-1"
                        name="deliveryTime"
                        type="number"
                        onChange={handleChange}
                        value={formData.deliveryTime}
                    />
                    {errors.deliveryTime && <p className="text-red-500">{errors.deliveryTime}</p>}
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Cuisines</h2>
                    {cuisine.map((cuisineItem) => (
                        <div key={cuisineItem}>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    value={cuisineItem}
                                    checked={formData.cuisines.includes(cuisineItem)}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                {cuisineItem}
                            </label>
                        </div>
                    ))}
                    {errors.cuisines && <p className="text-red-500">{errors.cuisines}</p>}
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Menu Items</h2>
                    {formData.menuItems.map((menuItem, index) => (

                        <div key={index} className="mb-4">
                            {
                                menuItemImage[index] && (
                                    <img src={menuItemImage[index]} alt="Menu Item Preview" className="mb-2 w-full h-32 object-cover rounded"/>
                                )
                            }
                            <label className="block font-semibold">Menu Item Name</label>
                            <input
                                className="w-full p-2 border rounded mt-1"
                                type="text"
                                value={menuItem.name}
                                onChange={(e) => handleMenuItemChange(index, "name", e)}
                            />
                            {errors[`menuItemName_${index}`] && (
                                <p className="text-red-500">{errors[`menuItemName_${index}`]}</p>
                            )}

                            <label className="block font-semibold">Price</label>
                            <input
                                className="w-full p-2 border rounded mt-1"
                                type="number"
                                value={menuItem.price}
                                onChange={(e) => handleMenuItemChange(index, "price", e)}
                            />
                            {errors[`menuItemPrice_${index}`] && (
                                <p className="text-red-500">{errors[`menuItemPrice_${index}`]}</p>
                            )}

                            <label className="block font-semibold">Image</label>
                            <input
                                type="file"
                                className="w-full p-2 border rounded mt-1"
                                onChange={(e) => handleMenuItemChange(index, "image", e)}
                                accept="image/*"
                            />
                            <Button onClick={() => removeMenuItem(index)} color="error" variant="outlined" className="mt-2">
                                Remove Menu Item
                            </Button>
                        </div>
                    ))}
                    <Button variant="contained" color="primary" onClick={addMenuItem} className="mb-4">
                        Add Menu Item
                    </Button>
                    {errors.menuItems && <p className="text-red-500">{errors.menuItems}</p>}
                </div>

                <Button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-3 rounded-md" 
                    sx={{
                        color: "black",
                        transition: "color 0.3s ease",
                        fontSize: "16px",
                        '&:hover': {
                        color: "orange",
                        },
                        marginTop:"10px"
                    }}
                    >
                    Save Restaurant
                    </Button>
            </div>
        </form>
    );
};

export default ManageRestaurant;


