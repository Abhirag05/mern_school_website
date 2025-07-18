import React, { useEffect, useState } from 'react';
import "./school.css";

const ContactUs = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);
     // Handle window resize
      useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
          // Close menu when resizing to larger screens
          if (window.innerWidth > 768) {
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
          font-size: 20px;
          text-align: center;
        }
        .contact-container {
          margin-top: 50px;
          height: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px;
          background-color: white;
          border-radius: 8px;
        }
        .contact-form {
          width: 100%;
          max-width: 600px;
          background-color: #e3e3e3ff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
        }
        .contact-inputs {
          width: 100%;
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          margin-bottom: 20px;
          transition: border-color 0.3s ease;
        }
        .contact-inputs:focus {
          border-color: #487ce3;
          outline: none;
        }
        .contact-form textarea {
          height: 150px;
          padding-top: 15px;
        }
        .contact-form button {
          padding: 12px 40px;
          font-size: 18px;
          color: white;
          background: linear-gradient(135deg, #ff7e5f, #feb47b);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: background 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .contact-form button:hover {
          background: linear-gradient(135deg, #feb47b, #ff7e5f);
        }
        .contact-form img {
          height: 18px;
          width: 18px;
        }
        @media (max-width: 768px) {
          .contact-container {
            padding: 15px;
          }
          .contact-form {
            padding: 30px;
          }
        }
      `}</style>
    
      <header>
        <div className="head">
          
          <div className="college-name">
            <h2>ST.JOSEPH'S L.P. SCHOOL,</h2>
            <h2 id="h">KUTTIKANAM</h2>
          </div>
        </div>
        <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
       <div className={`nav2 ${isMenuOpen ? 'active' : ''}`}>
          <nav>
             <ul>
              <li><a href="/" target="_self">HOME</a></li>
              <li><a href="/about" target="_self">ABOUT US</a></li>
              <li><a href="/gallery" target="_blank">GALLERY</a></li>
              <li><a href="/academics" target="_self">ACADEMICS</a></li>
              <li><a href="/admission" target="_self">ADMISSION</a></li>
              <li><a href="/staffs" target="_self">STAFFS</a></li>
              <li><a href="/contact" target="_blank">CONTACT US</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <div className="image-container">
        <img src="schoolbackground3.jpg" alt="school" />
        <div className="text">
          <h1>Contact Us</h1>
        </div> 
      </div>
      
      <div className="main">
        <div className="contact-container">
          <form action="https://api.web3forms.com/submit" method="POST" className="contact-form">
            <input type="hidden" name="access_key" value="6c466db1-de31-45da-b53e-350bfb4aa473" />
            <input type="text" name="name" placeholder="Your Name" className="contact-inputs" required />
            <input type="email" name="email" placeholder="Your E-Mail" className="contact-inputs" required />
            <textarea name="message" placeholder="Your Enquiry" className="contact-inputs" required></textarea>
            <button type="submit">
              Submit
              <img src="src/assets/contactform/arrow_icon.png" height="18px" alt="submit" />
            </button>
          </form>
        </div>
      </div>

      <footer>
        <div className="footer-name">
          <h2>ST.JOSEPH'S L.P. SCHOOL,</h2>
          <h2 id="h">KUTTIKANAM</h2>
          <p>(+91 -7594971004, +91 - 7594971020)</p>
        </div>
        <div className="footer-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.139342173254!2d76.9707368!3d9.5832552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b064d5a0b8cf841%3A0x50bc53ffe205e74e!2sSJLPS%20kuttikkanam!5e0!3m2!1sen!2sin!4v1736003669585!5m2!1sen!2sin"
            width="350"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="School Location"
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
              <span>
                Kuttikkanam P.O, Peermade, <br />Idukki District, Kerala,
                India
              </span>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright">
        <p>
          Copyright &copy; 2024 All Rights Reserved | ST.Joseph's L.P. School
          Kuttikanam | Privacy Policy | Terms &amp; Conditions
        </p>
      </div>
    </div>
  );
};

export default ContactUs;