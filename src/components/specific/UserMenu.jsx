/* eslint-disable react/prop-types */
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const UserMenu = ({ anchorEl, onClose, isAuthenticated, user, onLogout, onLogin, onMenuClick }) => {
    return (
        <>
            {isAuthenticated ? (
                <Button
                    sx={{
                        color: "black",
                        transition: "color 0.3s ease",
                        fontSize: "16px",
                        '&:hover': {
                            color: "orange"
                        },
                    }}
                    onClick={onMenuClick}
                >
                    {user?.name || 'Login'}
                </Button>
            ) : (
                <Button
                    sx={{
                        color: "black",
                        transition: "color 0.3s ease",
                        fontSize: "16px",
                        '&:hover': {
                            color: "orange"
                        },
                    }}
                    onClick={onLogin}
                >
                    Login
                </Button>
            )}

            {/* Render the menu only when authenticated */}
            {isAuthenticated && (
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={onClose}
                    onMouseLeave={onClose}
                >
                    <MenuItem onClick={onClose}>
                        <Link to="/user/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                            User Profile
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={onLogout}>
                        Logout
                    </MenuItem>
                </Menu>
            )}

            {/* Optional login menu */}
            {!isAuthenticated && (
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={onClose}
                    onMouseLeave={onClose}
                >
                    <MenuItem onClick={onLogin}>Login</MenuItem>
                </Menu>
            )}
        </>
    );
};

export default UserMenu;
