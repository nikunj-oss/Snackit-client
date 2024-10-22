const restaurantFormSchema = {
    restaurantName: "",
    city: "",
    country: "",
    deliveryPrice: "",
    deliveryTime: "",
    cuisines: [], // this will hold selected cuisines
    menuItems: [
      {
        name: "",
        price: "",
        image: null,
      },
    ],
    restaurantImage:null,
  };
  

  export default restaurantFormSchema