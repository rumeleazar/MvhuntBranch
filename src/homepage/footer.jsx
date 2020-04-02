import React from "react";

function Footer() {
  return (
    <div className="footer">
      <p>This site is powered by: </p>
      <img
        src={`https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg`}
        alt="themoviedb logo"
      ></img>
      <h4>MovieHunt &#169; 2020 | All Rights Reserved</h4>
      <h4>Created by Ryan Eleazar</h4>
    </div>
  );
}

export default Footer;
