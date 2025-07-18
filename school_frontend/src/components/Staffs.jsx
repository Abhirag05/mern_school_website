import React, { useEffect, useState } from 'react';
import "./school.css";

const Staffs = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // Filter functionality
useEffect(() => {
  const filterItem = document.querySelector(".item-links");
  const filterImages = document.querySelectorAll(".photo");

  const filterPhotos = (filterName) => {
    filterImages.forEach((image) => {
      const filteredImg = image.getAttribute('data-name');
      image.style.display = (filteredImg === filterName) ? 'block' : 'none';
    });
  };

  if (filterItem && filterImages.length > 0) {
    // Initial filter
    const initialFilterName = document.querySelector(".menu-active")?.getAttribute('data-name');
    if (initialFilterName) {
      filterPhotos(initialFilterName);
    }

    // Click handler
    const handleClick = (e) => {
      if (e.target.classList.contains("item-link")) {
        document.querySelector(".menu-active")?.classList.remove("menu-active");
        e.target.classList.add("menu-active");
        const filterName = e.target.getAttribute("data-name");
        filterPhotos(filterName);
      }
    };

    filterItem.addEventListener("click", handleClick);

    return () => {
      filterItem.removeEventListener("click", handleClick);
    };
  }
}, []);

   
    
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
        .staff-details {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 60px 0;
          background-color: #5e739d;
          border: 2px solid blueviolet;
        }
        .container {
          width: 80%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .staff-photos img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          transition: .4s ease;
        }
        .item-links {
          width: 60%;
          display: flex;
          margin: 40px auto;
          align-items: center;
          justify-content: center;
          gap: 40px;
        }
        .item-link {
          border: 1px solid #f20404;
          padding: 10px 30px;
          font-size: 18px;
          font-weight: 500;
          color: black;
          cursor: pointer;
          border-radius: 30px;
          transition: .4s ease;
        }
        .item-link:hover {
          background: linear-gradient(135deg, #ff7e5f, #feb47b);
          color: white;
        }
        .menu-active {
          background: linear-gradient(135deg, #ff7e5f, #feb47b);
          color: white;
        }
        .photos-group {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .photo {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 4px rgba(175, 175, 175, 0.4);
          height: auto;
          display: none;
        }
        .photo img {
          transition: transform 0.4s ease;
        }
        .photo:hover img {
          transform: scale(1.1);
        }
        @media (max-width: 1024px) {
          .container {
            width: 90%;
          }
          .item-links {
            width: 90%;
          }
        }
        @media (max-width: 991px) {
          .photos-group {
            grid-template-columns: 1fr 1fr;
          }
          .item-links {
            width: 100%;
          }
        }
        @media (max-width: 600px) {
          .photos-group {
            grid-template-columns: 1fr;
          }
          .item-links {
            justify-content: space-between;
            gap: 0;
          }
          .photo {
            height: auto;
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
          <h1>Staffs</h1>
        </div> 
      </div>

      <div name="staff_details">
        <div className="container">
          <div className="item-links">
            <span className="item-link menu-active" data-name="school">Teaching staffs</span>
            <span className="item-link" data-name="events">Non-teaching staffs</span>
          </div>

          <div className="staff-photos photos-group">
            <div className="photo" data-name="school">
              <img src="staff.png" alt="Teaching-staff" /> <br />
              <p style={{ textAlign: 'center' }}>Teaching Staff1</p>
            </div>
            <div className="photo" data-name="school">
              <img src="staff.png" alt="Teaching-staff" /> <br />
              <p style={{ textAlign: 'center' }}>Teaching Staff2</p>
            </div>
            <div className="photo" data-name="events">
              <img src="staff2.jpg" alt="Non-Teaching-staff" /> <br />
              <p style={{ textAlign: 'center' }}>Non-Teaching Staff1</p>
            </div>
            <div className="photo" data-name="events">
              <img src="staff2.jpg" alt="Non-Teaching-staff" /> <br />
              <p style={{ textAlign: 'center' }}>Non-Teaching Staff2</p>
            </div>
          </div>
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
              <span>Kuttikkanam P.O, Peermade, <br />Idukki District, Kerala, India</span>
            </div>
          </div>
        </div>
      </footer>

      <div className="copyright">
        <p>Copyright &copy; 2024 All Rights Reserved | ST.Joseph's L.P. School Kuttikanam | Privacy Policy | Terms & Conditions</p>
      </div>
    </div>
  );
};

export default Staffs;