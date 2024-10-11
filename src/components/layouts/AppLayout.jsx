/* eslint-disable react/display-name */
import { Grid2 } from "@mui/material";
import Header from "./Header.jsx";
import Hero from "../specific/Hero.jsx";
import Footer from "../specific/Footer.jsx";

const AppLayout = (WrappedComponent, { showHero = true } = {}) => {
  return (props) => {
    return (
      <Grid2 container direction={"column"} sx={{ minHeight: "100vh" }}>
        <Header />
        {showHero && <Hero />}
        <Grid2 container direction={"column"} sx={{ flexGrow: 1 }}>
          <WrappedComponent {...props} />
        </Grid2>
        <Footer />
      </Grid2>
    );
  };
};

export default AppLayout;
