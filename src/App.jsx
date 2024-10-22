import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import AuthCallBack from "./pages/AuthCallBack.jsx";
import UserProfileForm from "./pages/forms/UserProfileForm.jsx";
import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import ManageRestaurantPage from "./pages/ManageRestaurantPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/callback" element={<AuthCallBack />} />
      <Route element={<ProtectedRoute/>}>
      <Route path="/user/profile" element={<UserProfileForm/>} />
      <Route path="/restaurant/form"  element={<ManageRestaurantPage/>}/>
      </Route>
      
      <Route path="*" element={<>def</>} />
    </Routes>
  );
};

export default App;
