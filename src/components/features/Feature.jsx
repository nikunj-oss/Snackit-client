import { IconButton, Tooltip } from "@mui/material";

// eslint-disable-next-line react/prop-types
 const IconBtn = ({ icon, onClick, title }) => {
    return (
        <Tooltip title={title}>
            <IconButton size="large" onClick={onClick} sx={{
                transition: "color 0.3s ease", 
                '&:hover': {
                    color: "orange" 
                }
            }}>
                {icon}
            </IconButton>
        </Tooltip>
    );
};

export default IconBtn

