import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; // Import axios
import "./school_home.css";
import "./school.css";
import { motion, useAnimation, useInView } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

// The font-awesome link should be in your main index.html file's <head> section
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

function SchoolHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [newsItems, setNewsItems] = useState([]); // State for all valid news items
  const [displayNews, setDisplayNews] = useState([]); // State for news to be displayed

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // --- FETCH LATEST NEWS ---
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/news/all`);
        if (response.data.success && response.data.news.length > 0) {
          const today = new Date();
          
          // Filter out expired news and sort to find the most recent
          const validNews = response.data.news
            .filter(item => new Date(item.expiryDate) >= today)
            .sort((a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id));

          if (validNews.length > 0) {
            setNewsItems(validNews);
          } else {
            setNewsItems([{ title: "No recent announcements." }]);
          }
        } else {
          setNewsItems([{ title: "Admissions open from June 1st!" }]); // Default message
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setNewsItems([{ title: "Admissions open from June 1st!" }]); // Default message on error
      }
    };

    fetchNews();
  }, []);

  // --- LOGIC FOR SCROLLING NEWS ---
  useEffect(() => {
    // Display up to 3 news items. If more, create a looping list for scrolling animation.
    if (newsItems.length > 0) {
        if (newsItems.length <= 3) {
            setDisplayNews(newsItems);
        } else {
            // Duplicate the list to create a seamless loop for the CSS animation
            setDisplayNews([...newsItems, ...newsItems]);
        }
    }
  }, [newsItems]);


  // --- EXISTING LOGIC ---
  // Handle window resize
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

  // Animation triggers
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <style>{`
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

        .news-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          width: 90%;
          max-width: 400px;
          background-color: rgba(41, 41, 41, 0.95);
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          border-left: 4px solid #d01b1b;
          backdrop-filter: blur(10px);
          box-sizing: border-box;
        }

        .news-title {
          color: white;
          font-size: 1.2rem;
          margin-bottom: 10px;
          font-weight: 600;
          line-height: 1.3;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        /* --- STYLES FOR SCROLLING NEWS --- */
        .news-content {
            height: 120px;
            overflow: hidden;
            position: relative;
        }

        .news-list {
            position: absolute;
            width: 100%;
        }

        .news-list.scrolling {
            animation: scroll-up ${newsItems.length * 6}s linear infinite;
        }

        .news-list:hover {
            animation-play-state: paused;
        }

        @keyframes scroll-up {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(-50%);
            }
        }
        /* --- END OF SCROLLING NEWS STYLES --- */

        .news-highlight {
          color: #f5f5f5;
          font-weight: 500;
          font-size: 1rem;
          margin-bottom: 0.8rem;
          line-height: 1.4;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          display: block;
          padding: 0 5px;
        }

        .news-divider {
          height: 2px;
          background-color: #d01b1b;
          margin: 10px 0;
          opacity: 0.8;
          border-radius: 1px;
        }

        /* Responsive adjustments for news container */
        @media (min-width: 768px) {
          .news-container {
            top: 60%;
            left: 5%;
            transform: translateY(-50%);
            width: 35%;
            max-width: 350px;
            padding: 20px;
          }
          
          .news-title {
            font-size: 1.3rem;
          }
          
          .news-highlight {
            font-size: 1.1rem;
          }
        }

        @media (min-width: 1024px) {
          .news-container {
            left: 3%;
            width: 30%;
            max-width: 380px;
          }
        }

        @media (max-width: 480px) {
          .news-container {
            top: 65%;
            width: 50%;
              left: 30%;
            padding: 12px;
          }
          
          .news-content {
            height: 100px;
          }
          
          .news-title {
            font-size: 1rem;
            margin-bottom: 8px;
          }
          
          .news-highlight {
            font-size: 0.9rem;
            margin-bottom: 0.6rem;
          }
        }

        @media (max-width: 375px) {
          .news-container {
            top: 65%;
            left: 30%;
            width: 50%;
          }
          .news-title {
            font-size: 1rem;
          }
          .news-content {
            height: 90px;
          }
        }

        @media (max-width: 320px) {
          .news-container {
            top: 65%;
            width: 50%;
            padding: 10px;
            left: 30%;
          }
          
          .news-title {
            font-size: 1rem;
          }
          
          .news-highlight {
            font-size: 0.85rem;
          }
        }

        /* Keyframes */
        @keyframes slideUpFadeIn {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0% { opacity: 0.9; }
          50% { opacity: 1; }
          100% { opacity: 0.9; }
        }

        /* Hero image with parallax effect */
        .video {
          position: relative;
          margin-bottom: 0;
          overflow: hidden;
          height: 500px;
        }

        .video img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .video:hover img {
          transform: scale(1.03);
        }

        /* Section headings */
        .marian-life h1 {
          position: relative;
          display: inline-block;
          margin-bottom: 2rem;
          color: #2c3e50;
        }

        .marian-life h1::after {
          content: '';
          position: absolute;
          width: 50%;
          height: 3px;
          background: linear-gradient(to right, #d01b1b, transparent);
          bottom: -10px;
          left: 25%;
        }

        /* Grid items animation */
        .grids {
          perspective: 1000px;
        }

        .grids > div {
          transition: all 0.3s ease;
          transform-style: preserve-3d;
        }

        .grids > div:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        /* Additional responsive adjustments for video height */
        @media (max-width: 768px) {
          .video {
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .video {
            height: 250px;
          }
        }
      `}</style>

      {/* Header Section */}
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

      {/* Hero Section with Parallax Effect */}
      <div className="video">
        <ParallaxProvider>
            <Parallax speed={-10}>
                <img src="schoolimage.jpg" alt="school-img" />
            </Parallax>
        </ParallaxProvider>
        <motion.div 
          className="news-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="news-box">
            <h4 className="news-title">News & Announcements</h4>
            <div className="news-divider"></div>
            <div className="news-content">
                <div className={`news-list ${newsItems.length > 3 ? 'scrolling' : ''}`}>
                    {displayNews.map((news, index) => (
                        <p className="news-highlight" key={index}>
                            {news.title}
                        </p>
                    ))}
                </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Our Focus Section */}
      <motion.div 
        className="marian-life"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        ref={ref}
      >
        <motion.h1 variants={itemVariants}>OUR FOCUS</motion.h1>
        <motion.div 
          className="grids"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.img 
              src="motto.jpg" 
              alt="motto" 
              width="300px" 
              height="200px" 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <h4>MOTTO</h4>
            <p>
              "Learn, Grow, Shine" — At ST. JOSEPH'S L.P. SCHOOL, KUTTIKANAM, our motto reflects our dedication to nurturing young minds...
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.img 
              src="visionandmisiion1.jpg" 
              alt="visionandmission" 
              width="300px" 
              height="200px"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <h4>VISION & MISSION</h4>
            <p>
              Vision: To be a leader in primary education... <br />
              Mission: To provide holistic education that balances academic excellence with moral growth...
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.img 
              src="corevalues.jpg" 
              alt="corevalues" 
              width="300px" 
              height="200px"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <h4>CORE VALUES</h4>
            <p>
              1. Faith...<br />
              2. Excellence...<br />
              3. Respect...
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Our Facilities Section */}
      <motion.div 
        className="marian-life"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h1>OUR FACILITIES</h1>
        <div className="grids">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.img 
              src="library.webp" 
              alt="library" 
              width="300px" 
              height="200px"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <h4>LIBRARY</h4>
            <p>
              Our library empowers students to gain knowledge, spark creativity, and explore endless possibilities...
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.img 
              src="playground.jpeg" 
              alt="playground" 
              width="300px" 
              height="200px"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <h4>PLAYGROUND</h4>
            <p>
              A vibrant space for physical fitness, teamwork, and life skills...
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.img 
              src="facility.jpeg" 
              alt="other facilities" 
              width="300px" 
              height="200px"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <h4>OTHER FACILITIES</h4>
            <p>
              From classrooms to labs, we ensure students thrive academically and creatively...
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer - Kept as original per requirements */}
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
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="School Location"
          />
        </div>
        <div className="footer-contact">
          <h2>CONTACT US</h2>
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
              <span>Kuttikkanam P.O, Peermade, Idukki District, Kerala, India</span>
            </div>
          </div>
        </div>
      </footer>

      <div className="copyright">
        <p>
          Copyright &copy; 2024 All Rights Reserved 
        </p>
      </div>
    </>
  );
}

export default SchoolHome;