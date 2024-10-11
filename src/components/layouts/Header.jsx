import { Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import IconBtn from "../features/Feature.jsx";
import MobileDrawer from "../specific/MobileDrawer.jsx";
import UserMenu from "../specific/UserMenu.jsx";

const Header = () => {
    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
    const { isMobile } = useSelector(state => state.misc);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMobile = () => {
        dispatch(setIsMobile(true));
    };

    const handleClose = () => {
        dispatch(setIsMobile(false));
    };

    const handleLogin = async () => {
        try {
            await loginWithRedirect();
        } catch (e) {
            console.log(e);
        }
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="border-b-2 border-orange-500 py-6">
            <div className="mx-2">
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginX: "auto",
                    flexGrow: 1
                }}>
                    <Link className="text-3xl font-bold tracking-tight text-orange-500" to={"/"}>
                        SnackIt.com
                    </Link>
                    <Box sx={{
                        display: {
                            xs: "block",
                            sm: "none"
                        }
                    }}>
                        <IconBtn icon={<MenuIcon />} onClick={handleMobile} title="Menu Icon" />
                    </Box>

                    <MobileDrawer
                        isAuthenticated={isAuthenticated}
                        user={user}
                        open={isMobile}
                        onClose={handleClose}
                        onLogin={handleLogin}
                        onLogout={logoutHandler}
                    />

                    <Box sx={{
                        display: {
                            xs: "none",
                            sm: "block"
                        },
                        position: "relative"
                    }}>
                        <UserMenu
                            anchorEl={anchorEl}
                            onClose={handleMenuClose}
                            isAuthenticated={isAuthenticated}
                            user={user}
                            onLogout={logoutHandler}
                            onLogin={handleLogin}
                            onMenuClick={handleMenuClick}
                        />
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default Header;
