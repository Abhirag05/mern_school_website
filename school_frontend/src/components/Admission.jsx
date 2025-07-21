import React, { useEffect, useState } from 'react';
import "./school.css";

const Admission = () => {
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
      <style>
        {`
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

  
          .admission-notification {
            margin: auto;
            border: 1px solid #f20404;    
            max-width: 1000px;
            border-radius: 8px;
            padding: 20px; 
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: 50px;
            margin-bottom: 50px;
            background-color: #f9f9f9;
          }

          .admission-notification p {
            line-height: 1.8;
            font-size: 16px;
            color: #555;
            text-align: justify;
            margin-bottom: 20px;
          }
          
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }

          .admission-notification span {
            color: #f20404;
            animation: blink 1s infinite;
          }
          
          .class_details {
            max-width: 1000px;
            margin: auto;
            overflow-x: auto;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 60px;
            font-size: 17px;
            min-width: 600px;
          }

          table th, table td {
            padding: 12px;
            text-align: left;
            border: none;
          }
          
          table tr:nth-child(odd) {
            background-color: #f8f3f3;
          }

          table tr:nth-child(even) {
            background-color: #ffffff;
          }

          table td {
            border-bottom: 1px dashed #f03333;
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
          
          table th {
            text-align: center;
            background: linear-gradient(135deg, #ff7e5f, #feb47b); 
            color: white;
          }

          /* Responsive styles */
          @media (max-width: 768px) {
            .admission-notification {
              margin: 20px;
              padding: 15px;
              margin-top: 30px;
              margin-bottom: 30px;
            }

            .admission-notification p {
              font-size: 15px;
              line-height: 1.6;
            }

            .class_details {
              margin: 20px;
            }

            table {
              margin-top: 30px;
              font-size: 15px;
            }

            table th, table td {
              padding: 8px 10px;
            }

            table caption {
              font-size: 24px;
            }
          }

          @media (max-width: 480px) {
            .admission-notification {
              margin: 15px;
              padding: 12px;
            }

            .admission-notification p {
              font-size: 14px;
            }

            table {
              font-size: 14px;
            }

            table caption {
              font-size: 20px;
            }
          }
        `}
      </style>

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
          <h1>Admission</h1>
        </div> 
      </div>
      
      <div className="admission-notification">
        <p>
          Welcome to St. Joseph's L.P. School, Kuttikkanam! Admissions are now open for the upcoming academic year. We invite parents to enroll their children into our nurturing and dynamic learning environment. Seats are limited, so apply early to secure your spot. For more details regarding the admission process, eligibility criteria, and required documents, please contact our admissions office or visit us during working hours. We look forward to welcoming your child to our school family!. <span>Admission will open from june 1!!</span>
        </p>
      </div>
      
      <div className="class_details">
        <table>
          <caption>Class Details</caption>
          <thead>
            <tr>
              <th>Classes</th>
              <th colSpan="4">Subjects</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Class 1</td>
              <td>English1</td>
              <td>Maths1</td>
              <td>EVS1</td>
              <td>Malayalam1</td>
            </tr>
            <tr>
              <td>Class 2</td>
              <td>English2</td>
              <td>Maths2</td>
              <td>EVS2</td>
              <td>Malayalam2</td>
            </tr>
            <tr>
              <td>Class 3</td>
              <td>English3</td>
              <td>Maths3</td>
              <td>EVS3</td>
              <td>Malayalam3</td>
            </tr>
            <tr>
              <td>Class 4</td>
              <td>English4</td>
              <td>Maths4</td>
              <td>EVS4</td>
              <td>Malayalam4</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <footer>
        <div className="footer-name">
          <h2>ST.JOSEPH'S L.P. SCHOOL,</h2><h2 id="h">KUTTIKANAM</h2>
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
        <p>Copyright &copy; 2024 All Rights Reserved </p>
      </div>
    </div>
  );
};

export default Admission;