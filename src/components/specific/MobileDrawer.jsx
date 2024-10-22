/* eslint-disable react/prop-types */
import { Box, Button, Collapse, Drawer, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const MobileDrawer = ({ isAuthenticated, user, open, onClose, onLogin, onLogout }) => {
    const [openCollapsible, setOpenCollapsible] = useState(false);

    const handleCollapsibleToggle = () => {
        setOpenCollapsible(prev => !prev);
    };

    return (
        <Drawer open={open} onClose={onClose} anchor="right" sx={{ width: "250px" }}>
            <Box sx={{ padding: "16px", display: "flex", flexDirection: "column", width: "250px" }}>
                <Typography variant="h6" sx={{ textAlign: "center", marginY: 2, fontWeight: "bold" }}>
                    Let the Snacking Begin
                </Typography>
                <hr />
                {isAuthenticated ? (
                    <Button sx={{
                        color: "black",
                        transition: "color 0.3s ease",
                        fontSize: "16px",
                        '&:hover': {
                            color: "orange"
                        },
                    }} onClick={handleCollapsibleToggle}>
                        {user?.name}
                    </Button>
                ) : (
                    <Button sx={{
                        color: "black",
                        transition: "color 0.3s ease",
                        fontSize: "16px",
                        '&:hover': {
                            color: "orange"
                        },
                    }} onClick={onLogin}>
                        Login
                    </Button>
                )}

                <Collapse in={openCollapsible} timeout="auto" unmountOnExit>
                    <Box sx={{ padding: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Link to="/user/profile">
                            <Typography variant="subtitle1" sx={{ textAlign: "center", marginY: 1, fontSize: "16px" }}>
                                User Profile
                            </Typography>
                        </Link>
                        <Link to="/restaurant/form" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Manage Restaurant
                        </Link>
                        <Button sx={{
                            color: "black",
                            transition: "color 0.3s ease",
                            fontSize: "14px",
                            '&:hover': {
                                color: "orange"
                            },
                        }} onClick={onLogout}>
                            LogOut
                        </Button>
                    </Box>
                </Collapse>
            </Box>
        </Drawer>
    );
};

export default MobileDrawer;
