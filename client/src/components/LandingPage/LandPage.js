
import React, { useEffect, useRef } from 'react';
import "./LandPage.css";
import { Animation } from './init.js';
import { Link } from 'react-router-dom'; // Import Link


function handleLinkHover(e) {
  const cricketBall = document.getElementById("cricket-ball");
  const link = e.target;
  const linkRect = link.getBoundingClientRect();

  cricketBall.style.left = linkRect.left + "px";
  cricketBall.style.top = linkRect.top/9 + linkRect.height / 2 + "px";
  cricketBall.style.display = "block";

   // Toggle the "nav-link-hidden" class on hover
   link.classList.add("nav-link-hidden");
  link.addEventListener("mouseleave", () => {
    cricketBall.style.display = "none";

        // Remove the "nav-link-hidden" class when hover is removed
        link.classList.remove("nav-link-hidden");
  });
  
}


const LandPage = () => {
  const animationContainer = useRef(null);
  const ballRef=useRef(null);
Animation(animationContainer,ballRef);

  

  return (
    <>
    <body className='homee'>
      <header>
        <nav>
          <ul>
            <li>
            <Link to="/" className="nav-link" onMouseEnter={handleLinkHover}>
                Home
              </Link>
            </li>
            <li> <Link to="/about" className="nav-link" onMouseEnter={handleLinkHover}>
                About Us
              </Link></li>
            <li>
                <Link to="/signup" className="nav-link" onMouseEnter={handleLinkHover}>
                Signup
              </Link></li>
          </ul>
          <div id="cricket-ball"></div>
        </nav>
      </header>
      <main>
        <section className="search-section">
          <h2>Find Box Cricket Near You</h2>
          <br></br>
          <form>
            <input type="text" placeholder="Enter location" />
            <button type="submit">Search</button>
          </form>
        </section>

        <section className="animation-section">
          <h2>Cricket Ball Animation</h2>
          <div className="animation-container" ref={animationContainer}></div>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Box Cricket Registration</p>
      </footer>
      </body>
    </>
  );
};

export default LandPage;