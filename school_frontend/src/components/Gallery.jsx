import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import "./school.css";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("school");
  const [galleryImages, setGalleryImages] = useState([]); // State to hold images from backend
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(''); // State to handle errors

  // --- Fetch Gallery Images from Backend ---
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // Use the VITE_API_URL from your .env file
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/gallery/all`);
        if (response.data.success) {
          setGalleryImages(response.data.gallery);
        } else {
          
          setError("Could not fetch gallery images.");
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
        setError("An error occurred while fetching the gallery.");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleFilterClick = (filterName) => {
    setActiveFilter(filterName);
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

        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
          box-sizing: border-box;
        }
        .photos-group img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: 0.4s ease;
        }
        .item-links {
          width: 100%;
          display: flex;
          margin: 40px auto;
          align-items: center;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        .item-link {
          border: 1px solid #f20404;
          padding: 8px 15px;
          font-size: 16px;
          font-weight: 500;
          color: black;
          cursor: pointer;
          border-radius: 30px;
          transition: 0.4s ease;
          white-space: nowrap;
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
          height: 20%;
          gap: 20px;
        }
        .photo {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 4px rgba(175, 175, 175, 0.4);
          height: 24rem;
          animation: SclAnimation 0.3s ease;
          display: ${activeFilter ? 'none' : 'block'};
        }
        .photo[data-name="${activeFilter}"] {
          display: block;
        }
        @keyframes SclAnimation {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        .photo:hover img {
          transform: scale(1.1);
        }
        @media (max-width: 1024px) {
          .container {
            width: 90%;
          }
          .item-links {
            gap: 20px;
          }
        }
        @media (max-width: 991px) {
          .photos-group {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 768px) {
          .item-links {
            gap: 10px;
          }
          .item-link {
            padding: 6px 12px;
            font-size: 14px;
          }
        }
        @media (max-width: 600px) {
          .photos-group {
            grid-template-columns: 1fr;
          }
          .item-links {
            justify-content: center;
            gap: 8px;
          }
          .photo {
            height: max-content;
          }
        }
        @media (max-width: 480px) {
          .item-link {
            padding: 5px 10px;
            font-size: 13px;
          }
        }
        @media (max-width: 320px) {
          .item-links {
            gap: 5px;
          }
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
          <h1>Gallery</h1>
        </div>
      </div>

      <div className="container">
        <div className="item-links">
          <span
            className={`item-link ${activeFilter === 'school' ? 'menu-active' : ''}`}
            data-name="school"
            onClick={() => handleFilterClick('school')}
          >
            School
          </span>
          <span
            className={`item-link ${activeFilter === 'events' ? 'menu-active' : ''}`}
            data-name="events"
            onClick={() => handleFilterClick('events')}
          >
            Events
          </span>
          <span
            className={`item-link ${activeFilter === 'facilities' ? 'menu-active' : ''}`}
            data-name="facilities"
            onClick={() => handleFilterClick('facilities')}
          >
            Facilities
          </span>
        </div>

        {/* --- DYNAMICALLY RENDERED IMAGES --- */}
        <div className="photos-group">
          {loading && <p>Loading gallery...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && galleryImages.map((image) => (
            <div className="photo" data-name={image.tag} key={image._id}>
              <img src={image.imageUrl} alt={image.tag} />
            </div>
          ))}
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
            style={{border:0}} 
            allowFullScreen 
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
        <p>
          Copyright &copy; 2024 All Rights Reserved 
        </p>
      </div>
    </div>
  );
};

export default Gallery;