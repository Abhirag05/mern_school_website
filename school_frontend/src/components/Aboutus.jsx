import React, { useState } from 'react';
import { useEffect } from 'react';
import "./school.css";

const Aboutus = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 1300) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector('.nav2 nav');
      const hamburger = document.querySelector('.hamburger');
      
      if (
        nav && 
        hamburger &&
        !nav.contains(event.target) && 
        !hamburger.contains(event.target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <style jsx>{`
        .fixed-header {
          position: fixed;
          top: 0;
          width: 100%;
          background-color: white;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          height: 80px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .image-container {
          margin-top: 80px;
        }

        .image-container img {
          width: 100%;
          height: 190px;
          display: block;
        }
        .image-container {
          position: relative;
          width: 100%;
        }
        .image-container .text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: black;
          padding: 10px 20px;
          font-size: 14px;
          text-align: center;
        }

        /* --------------  RESPONSIVE about & overview  -------------- */
        .about {
          margin: 50px auto;
          border: 1px solid #f20404;
          max-width: 1000px;
          width: calc(100% - 40px);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          background-color: #f9f9f9;
        }
        .about p {
          line-height: 1.8;
          font-size: 16px;
          color: #555;
          text-align: justify;
          margin-bottom: 20px;
        }
        @media (max-width: 1024px) {
          .about {
            width: calc(100% - 80px);
            margin-left: 40px;
            margin-right: 40px;
          }
        }
        @media (max-width: 768px) {
          .about {
            width: calc(100% - 60px);
            margin-left: 30px;
            margin-right: 30px;
          }
        }
        @media (max-width: 480px) {
          .about {
            width: calc(100% - 32px);
            margin: 20px 16px 40px;
            padding: 16px;
          }
        }

        .overview {
          width: 100%;
          max-width: 1000px;
          margin: auto;
          padding: 0 16px;
          box-sizing: border-box;
        }
        @media (max-width: 480px) {
          .overview {
            padding: 8px 8px;
          }
        }
        /* ----------------------------------------------------------- */

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 60px;
          font-size: 17px;
        }
        table th, table td {
          border: 1px solid #f20404;
          padding: 12px;
          text-align: left;
        }
        table tr:nth-child(even) {
          background-color: #e1dddd;
        }
        table tr:nth-child(odd) {
          background-color: #ffffff;
        }
        table tr:hover {
          background-color: #f2f2f2;
          cursor: pointer;
        }
        table td:first-child {
          font-weight: bold;
        }
        table caption {
          font-size: 30px;
          margin-bottom: 10px;
          text-align: left;
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
          align-items: center;
        }

        .desktop-nav ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .desktop-nav ul li {
          margin: 0 15px;
        }

        .desktop-nav ul li a {
          text-decoration: none;
          color: black;
          font-size: 16px;
          transition: color 0.3s;
        }

        .desktop-nav ul li a:hover {
          color: #d01b1b;
        }
      `}</style>

      <header className="fixed-header">
        <div className="header-content">
          <div className="head">
            <div className="college-name">   
              <h2>ST.JOSEPH'S L.P. SCHOOL</h2><h2 id="h">KUTTIKANAM</h2>
            </div>
          </div>

          {/* Desktop Navigation */}
          {windowWidth > 1300 && (
            <div className="desktop-nav">
              <nav>
                <ul>
                  <li><a href="/" target="_self">HOME</a></li>
                  <li><a href="/about" target="_self">ABOUT US</a></li>
                  <li><a href="/gallery" target="_self">GALLERY</a></li>
                  <li><a href="/academics" target="_self">ACADEMICS</a></li>
                  <li><a href="/admission" target="_self">ADMISSION</a></li>
                  <li><a href="/staffs" target="_self">STAFFS</a></li>
                  <li><a href="/contact" target="_self">CONTACT US</a></li>
                </ul>
              </nav>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          {windowWidth <= 1300 && (
            <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {windowWidth <= 1300 && isMenuOpen && (
          <div className="menu-overlay" onClick={closeMenu}></div>
        )}

        {windowWidth <= 1300 && (
          <div className={`nav2 ${isMenuOpen ? 'active' : ''}`}>
            <nav>
              <ul>
                <li><a href="/" target="_self" onClick={closeMenu}>HOME</a></li>
                <li><a href="/about" target="_self" onClick={closeMenu}>ABOUT US</a></li>
                <li><a href="/gallery" target="_self" onClick={closeMenu}>GALLERY</a></li>
                <li><a href="/academics" target="_self" onClick={closeMenu}>ACADEMICS</a></li>
                <li><a href="/admission" target="_self" onClick={closeMenu}>ADMISSION</a></li>
                <li><a href="/staffs" target="_self" onClick={closeMenu}>STAFFS</a></li>
                <li><a href="/contact" target="_self" onClick={closeMenu}>CONTACT US</a></li>
              </ul>
            </nav>
          </div>
        )}
      </header>
      
      <div className="image-container">
        <img src="schoolbackground3.jpg" alt="school" />
        <div className="text">
          <h1>About Us</h1>
        </div> 
      </div>
      
      <div className="about">
        <p>
          ST. JOSEPH'S L.P. SCHOOL, KUTTIKANAM is a renowned primary school nestled 
          in the serene greenery of Kuttikkanam, Kerala. Dedicated to classes 1 through 4,
          the school fosters a holistic approach to education, blending academic excellence with moral and social growth. 
          With experienced faculty, modern infrastructure, and a safe, inclusive environment, we strive to nurture every child's potential.
          Our vision is to inspire young minds to achieve greatness, guided by core values of faith, excellence, and respect. At ST. JOSEPH'S,
          we prepare students to shine brightly as compassionate, confident, and capable individuals.
        </p>
      </div>
      
      <div className="overview">
        <table>
          <caption>School Overview</caption>
          <tbody>
            <tr>
              <td>Name of the school</td> <td> ST. JOSEPH'S L.P. SCHOOL, KUTTIKANAM</td>
            </tr>
            <tr>
              <td>Place</td><td>Kuttikanam</td>
            </tr>
            <tr>
              <td>State</td><td>Kerala</td>
            </tr>
            <tr>
              <td>Principal</td><td>Ms.Keerthana</td>
            </tr>
            <tr>
              <td>Year of establishment</td><td>1964</td>
            </tr>
            <tr>
              <td>Financial category</td><td>Government</td>
            </tr>
            <tr>
              <td>Contact details</td><td>83902228294</td>
            </tr>
            <tr>
              <td>No of classes</td><td>4</td>
            </tr>
            <tr>
              <td>Location</td><td>Rural</td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer>
        <div className="footer-name">
          <h2>ST.JOSEPH'S L.P. SCHOOL,</h2><h2 id="h">KUTTIKANAM</h2>
          <p>
            (+91 -7594971004, +91 - 7594971020)
          </p>
        </div>
        <div className="footer-map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.139342173254!2d76.9707368!3d9.5832552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b064d5a0b8cf841%3A0x50bc53ffe205e74e!2sSJLPS%20kuttikkanam!5e0!3m2!1sen!2sin!4v1736003669585!5m2!1sen!2sin" 
            width="350" 
            height="200" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="School Location Map"
          ></iframe>
        </div>
        <div className="footer-contact">
          <h2>GET IN TOUCH</h2>
          <div className="contact-items">
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>Reception - +91 - 7594971004</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>Admissions - +91 - 7594971020</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>stjosephlpschool@gmail.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Kuttikkanam P.O, Peermade, <br />Idukki District, Kerala, India</span>
            </div>
          </div>
        </div>
      </footer>
      
      <div className="copyright">
        <p>Copyright &copy; 2024 All Rights Reserved </p>
      </div>
    </div>
  );
};

export default Aboutus;