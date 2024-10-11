/* eslint-disable react-refresh/only-export-components */
import { useForm } from 'react-hook-form';
import AppLayout from '../../components/layouts/AppLayout';
import { Button } from '@mui/material';
import { useEditUserProfileMutation, useGetUserProfileQuery } from '../../redux/api';
import toast from 'react-hot-toast';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';

const UserProfileForm = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(null);
  
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

  // API call only after the token is available
  const { data, isLoading } = useGetUserProfileQuery({ token }, { skip: !token });  // Skip API call if token is not yet available

  const [editUserProfile] = useEditUserProfileMutation();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (data) {
      setValue("email", data.email);
      setValue("name", data.name);
      setValue("addressLine1", data.addressLine1);
      setValue("city", data.city);
      setValue("country", data.country);
    }
  }, [data, setValue]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data found</p>;
  }

  const onSubmit = async (formData) => {
    const { addressLine1, city, country,name } = formData;

    try {
      const res = await editUserProfile({
        data: { addressLine1, city, country,name },
        token,  // Use the token from state
      }).unwrap();
      console.log("Profile Updated Successfully", res);
      toast.success("Profile updated successfully!");
    } catch (e) {
      console.error("Error updating profile", e);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-4 md:p-8 mt-10 md:mt-16 space-y-6"
      >
        <div className="space-y-2">
          <input 
            type="email" 
            placeholder="Email" 
            {...register("email")}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            readOnly
          />
        </div>

        <div className="space-y-2">
          <input 
            type="text" 
            placeholder="Name" 
            {...register("name")}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            
          />
        </div>

        <div className="space-y-2">
          <input 
            type="text" 
            placeholder="Address Line 1" 
            {...register("addressLine1", { required: "Address is required", minLength: 3, maxLength: 30 })}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.addressLine1 && <span className="text-red-500">{errors.addressLine1.message}</span>}
        </div>

        <div className="space-y-2">
          <input 
            type="text" 
            placeholder="City" 
            {...register("city", { required: "City is required" })}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.city && <span className="text-red-500">{errors.city.message}</span>}
        </div>

        <div className="space-y-2">
          <input 
            type="text" 
            placeholder="Country" 
            {...register("country", { required: "Country is required" })}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.country && <span className="text-red-500">{errors.country.message}</span>}
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
          }}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default AppLayout(UserProfileForm, { showHero: false });
