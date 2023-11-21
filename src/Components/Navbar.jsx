import React, { useState } from "react";
import img1 from '../Assets/Vector.png'
import img2 from'./../Assets/refresh.png'
function Navbar(props) {
    function refreshPage() {
        window.location.reload(false);
      }
  return (
    <div className="outer1">
        <nav className="navbar">
     <h3 className="weather-app" > <img src={img1} className="img1"/>Weather 99</h3>
     <p className="weather-app" onClick={refreshPage}><img src={img2} className="img2"/> Refresh</p>
        </nav>

    </div>
  );
}

export default Navbar;
