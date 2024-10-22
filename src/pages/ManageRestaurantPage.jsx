/* eslint-disable react-refresh/only-export-components */
import AppLayout from "../components/layouts/AppLayout"
import ManageRestaurant from "./forms/ManageRestaurant"

const ManageRestaurantPage = () => {
  return (
    <ManageRestaurant/>
  )
}

export default AppLayout(ManageRestaurantPage, { showHero: false })