import React from "react";
import car1 from "../../Images/car1.jpg";
import car2 from "../../Images/car2.jpeg";
import car3 from "../../Images/car3.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Frontpage.css";

export const Frontpage = () => {
  const options = {
    navigation: true, // Show next and prev buttons

    slideSpeed: 300,
    paginationSpeed: 400,

    items: 1,
    itemsDesktop: false,
    itemsDesktopSmall: false,
    itemsTablet: false,
    itemsMobile: false,
  };

  return (
    <OwlCarousel className="slider-items owl-carousel owl-theme" {...options}>
        <div className="item">
          <img src={car1} alt="The Last of us" />
        </div>
        <div className="item">
          <img src={car2} alt="GTA V" />
        </div>
        <div className="item">
          <img src={car3} alt="Mirror Edge" />
        </div>
    </OwlCarousel>
  );
};
