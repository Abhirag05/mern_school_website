import React, { useEffect, useState } from 'react';
import "./school.css";
const Academics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileView, setMobileView] = useState(window.innerWidth <= 768);
  const [expandedTab, setExpandedTab] = useState(null);

  const showClassDetails = (className) => {
    setActiveTab(className);
    if (mobileView) {
      setExpandedTab(expandedTab === className ? null : className);
    }
  };
      
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      setMobileView(newWidth <= 768);
      // Close menu when resizing to larger screens
      if (newWidth > 768) {
        setIsMenuOpen(false);
        setExpandedTab(null);
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
          font-size: 20px;
          text-align: center;
        }

          .content-wrapper {
            display: flex;
            justify-content: space-between;
            margin-left: 100px;
            margin-top: 70px;
          }

          .container {
            width: 40%;
            display: grid;
            gap: 20px;
          }

          .container div {
            color: black;
            border: 1px solid #f20404;
            padding: 15px;
            text-align: center;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
          }

          .container div.selected {
            background: linear-gradient(135deg, #ff7e5f, #feb47b);
            color: white;
          }

          .container div:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
          }
          .container2 div:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
          }

          .container2 {
            margin-right: 100px;
          }

          .display {
            border: 1px solid #f20404;
            max-width: 600px;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: 30px;
            margin-bottom: 50px;
            background-color: #f9f9f9;
            display: none;
          }

          .display.active {
            display: block;
          }

          .display p {
            line-height: 1.8;
            font-size: 16px;
            color: #555;
            text-align: justify;
            margin-bottom: 20px;
          }

          /* Mobile Accordion Styles */
          .mobile-accordion {
            display: none;
          }

          .mobile-accordion-item {
            margin-bottom: 15px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }

          .mobile-accordion-header {
            background: linear-gradient(135deg, #ff7e5f, #feb47b);
            color: white;
            padding: 15px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
          }

          .mobile-accordion-header.inactive {
            background: white;
            color: black;
            border: 1px solid #f20404;
          }

          .mobile-accordion-content {
            padding: 0;
            background: #f9f9f9;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out;
          }

          .mobile-accordion-content.active {
            padding: 15px;
            max-height: 1000px;
            border: 1px solid #f20404;
            border-top: none;
            border-radius: 0 0 8px 8px;
          }

          .mobile-accordion-content p {
            line-height: 1.8;
            font-size: 16px;
            color: #555;
            text-align: justify;
            margin: 0;
          }

          .accordion-icon {
            transition: transform 0.3s;
          }

          .accordion-icon.active {
            transform: rotate(180deg);
          }

          @media (max-width: 768px) {
            .content-wrapper {
              flex-direction: column;
              margin-left: 20px;
              margin-right: 20px;
              margin-top: 30px;
            }

            .container {
              width: 100%;
              margin-bottom: 20px;
              display: none;
            }

            .container2 {
              display: none;
            }

            .mobile-accordion {
              display: block;
              width: 100%;
            }

            .display {
              max-width: 100%;
              margin-top: 20px;
              margin-bottom: 20px;
            }
          }
        `}
      </style>

     <header className="fixed-header">
        <div className="header-content">
          <div className="head">
            <div className="college-name">   
              <h2>ST.JOSEPH'S L.P. SCHOOL,</h2><h2 id="h">KUTTIKANAM</h2>
            </div>
          </div>

          {/* Desktop Navigation */}
          {windowWidth > 1300 && (
            <div className="desktop-nav">
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
                <li><a href="/gallery" target="_blank" onClick={closeMenu}>GALLERY</a></li>
                <li><a href="/academics" target="_self" onClick={closeMenu}>ACADEMICS</a></li>
                <li><a href="/admission" target="_self" onClick={closeMenu}>ADMISSION</a></li>
                <li><a href="/staffs" target="_self" onClick={closeMenu}>STAFFS</a></li>
                <li><a href="/contact" target="_blank" onClick={closeMenu}>CONTACT US</a></li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      <div className="image-container">
        <img src="schoolbackground3.jpg" alt="school" />
        <div className="text">
          <h1>Academics</h1>
        </div> 
      </div>

      <div className="content-wrapper">
        <div className="container">
          <div 
            className={`overview ${activeTab === 'overview' ? 'selected' : ''}`} 
            onClick={() => showClassDetails('overview')}
          >
            <h3>Overview</h3>
          </div>
          <div 
            className={`class1 ${activeTab === 'class1' ? 'selected' : ''}`} 
            onClick={() => showClassDetails('class1')}
          >
            <h3>Class 1</h3>
          </div>
          <div 
            className={`class2 ${activeTab === 'class2' ? 'selected' : ''}`} 
            onClick={() => showClassDetails('class2')}
          >
            <h3>Class 2</h3>
          </div>
          <div 
            className={`class3 ${activeTab === 'class3' ? 'selected' : ''}`} 
            onClick={() => showClassDetails('class3')}
          >
            <h3>Class 3</h3>
          </div>
          <div 
            className={`class4 ${activeTab === 'class4' ? 'selected' : ''}`} 
            onClick={() => showClassDetails('class4')}
          >
            <h3>Class 4</h3>
          </div> 
        </div>

        <div className="container2">
          <div id="overview" className={`display ${activeTab === 'overview' ? 'active' : ''}`}>
            <p>
              At St. Joseph's L.P. School, Kuttikkanam, we provide a well-rounded academic foundation for students 
              from Class 1 to Class 4. Our curriculum includes core subjects such as English, Mathematics, Environmental 
              Studies (EVS), Science, and Hindi, designed to foster critical thinking, creativity, and strong communication 
              skills. Through engaging lessons and hands-on activities, students develop a deep understanding of fundamental 
              concepts while cultivating a love for learning. Our approach ensures a balanced education that nurtures academic 
              growth and personal development in a supportive and dynamic environment.
            </p>
          </div>
          <div id="class1" className={`display ${activeTab === 'class1' ? 'active' : ''}`}>
            <p>
              In Class 1, students embark on their academic journey with a foundation in English, Mathematics, Environmental Studies (EVS),
              Science, and Hindi. Through engaging activities and stories, we introduce children to basic literacy and numeracy skills. 
              In EVS, they explore the world around them, learning about plants, animals, and the environment. Science is introduced 
              with simple experiments that ignite curiosity, and Hindi is taught using fun songs and games. The emphasis is on creating 
              a joyful and interactive learning environment that lays the groundwork for future academic growth.
            </p>
          </div>
          <div id="class2" className={`display ${activeTab === 'class2' ? 'active' : ''}`}>
            <p>
              Class 2 students build upon the skills learned in Class 1, focusing on strengthening their foundation in English, Mathematics, Environmental Studies (EVS), Science, and Hindi. In English, students practice reading and writing simple sentences, expanding their vocabulary and comprehension. Mathematics introduces basic concepts such as addition, subtraction, and shapes. In EVS, children learn about the seasons, habitats, and the importance of plants and animals. Science lessons become more hands-on, with experiments that help students understand basic concepts like force and motion. Hindi is taught through conversational exercises, helping students speak confidently in the language.
            </p>
          </div>
          <div id="class3" className={`display ${activeTab === 'class3' ? 'active' : ''}`}>
            <p>
              Class 3 students delve deeper into the subjects of English, Mathematics, Environmental Studies (EVS), Science, and Hindi. English lessons focus on grammar and sentence structure, encouraging students to write short paragraphs and engage in storytelling. Mathematics includes the introduction of multiplication, division, and time, helping students develop problem-solving skills. In EVS, they study ecosystems, the water cycle, and natural resources, fostering an understanding of the environment. Science lessons cover topics like the human body, weather, and the solar system. Hindi is taught through reading comprehension and simple writing tasks, allowing students to develop their language skills in a fun and engaging way.
            </p>
          </div>
          <div id="class4" className={`display ${activeTab === 'class4' ? 'active' : ''}`}>
            <p>
              In Class 4, students continue to expand their knowledge in English, Mathematics, Environmental Studies (EVS), Science, and Hindi, with a focus on more complex concepts. In English, students learn to write descriptive essays and engage in group discussions. Mathematics covers topics like fractions, geometry, and basic algebra, helping students sharpen their logical thinking. EVS lessons explore topics such as plant reproduction, ecosystems, and human impact on the environment. Science focuses on the states of matter, electricity, and simple machines, encouraging students to experiment and observe. Hindi lessons involve reading and analyzing short stories, while expanding vocabulary and grammar skills to foster fluency in the language.
            </p>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="mobile-accordion">
          <div className="mobile-accordion-item">
            <div 
              className={`mobile-accordion-header ${expandedTab === 'overview' ? '' : 'inactive'}`}
              onClick={() => showClassDetails('overview')}
            >
              <h3>Overview</h3>
              <i className={`fas fa-chevron-down accordion-icon ${expandedTab === 'overview' ? 'active' : ''}`}></i>
            </div>
            <div className={`mobile-accordion-content ${expandedTab === 'overview' ? 'active' : ''}`}>
              <p>
                At St. Joseph's L.P. School, Kuttikkanam, we provide a well-rounded academic foundation for students 
                from Class 1 to Class 4. Our curriculum includes core subjects such as English, Mathematics, Environmental 
                Studies (EVS), Science, and Hindi, designed to foster critical thinking, creativity, and strong communication 
                skills. Through engaging lessons and hands-on activities, students develop a deep understanding of fundamental 
                concepts while cultivating a love for learning. Our approach ensures a balanced education that nurtures academic 
                growth and personal development in a supportive and dynamic environment.
              </p>
            </div>
          </div>

          <div className="mobile-accordion-item">
            <div 
              className={`mobile-accordion-header ${expandedTab === 'class1' ? '' : 'inactive'}`}
              onClick={() => showClassDetails('class1')}
            >
              <h3>Class 1</h3>
              <i className={`fas fa-chevron-down accordion-icon ${expandedTab === 'class1' ? 'active' : ''}`}></i>
            </div>
            <div className={`mobile-accordion-content ${expandedTab === 'class1' ? 'active' : ''}`}>
              <p>
                In Class 1, students embark on their academic journey with a foundation in English, Mathematics, Environmental Studies (EVS),
                Science, and Hindi. Through engaging activities and stories, we introduce children to basic literacy and numeracy skills. 
                In EVS, they explore the world around them, learning about plants, animals, and the environment. Science is introduced 
                with simple experiments that ignite curiosity, and Hindi is taught using fun songs and games. The emphasis is on creating 
                a joyful and interactive learning environment that lays the groundwork for future academic growth.
              </p>
            </div>
          </div>

          <div className="mobile-accordion-item">
            <div 
              className={`mobile-accordion-header ${expandedTab === 'class2' ? '' : 'inactive'}`}
              onClick={() => showClassDetails('class2')}
            >
              <h3>Class 2</h3>
              <i className={`fas fa-chevron-down accordion-icon ${expandedTab === 'class2' ? 'active' : ''}`}></i>
            </div>
            <div className={`mobile-accordion-content ${expandedTab === 'class2' ? 'active' : ''}`}>
              <p>
                Class 2 students build upon the skills learned in Class 1, focusing on strengthening their foundation in English, Mathematics, Environmental Studies (EVS), Science, and Hindi. In English, students practice reading and writing simple sentences, expanding their vocabulary and comprehension. Mathematics introduces basic concepts such as addition, subtraction, and shapes. In EVS, children learn about the seasons, habitats, and the importance of plants and animals. Science lessons become more hands-on, with experiments that help students understand basic concepts like force and motion. Hindi is taught through conversational exercises, helping students speak confidently in the language.
              </p>
            </div>
          </div>

          <div className="mobile-accordion-item">
            <div 
              className={`mobile-accordion-header ${expandedTab === 'class3' ? '' : 'inactive'}`}
              onClick={() => showClassDetails('class3')}
            >
              <h3>Class 3</h3>
              <i className={`fas fa-chevron-down accordion-icon ${expandedTab === 'class3' ? 'active' : ''}`}></i>
            </div>
            <div className={`mobile-accordion-content ${expandedTab === 'class3' ? 'active' : ''}`}>
              <p>
                Class 3 students delve deeper into the subjects of English, Mathematics, Environmental Studies (EVS), Science, and Hindi. English lessons focus on grammar and sentence structure, encouraging students to write short paragraphs and engage in storytelling. Mathematics includes the introduction of multiplication, division, and time, helping students develop problem-solving skills. In EVS, they study ecosystems, the water cycle, and natural resources, fostering an understanding of the environment. Science lessons cover topics like the human body, weather, and the solar system. Hindi is taught through reading comprehension and simple writing tasks, allowing students to develop their language skills in a fun and engaging way.
              </p>
            </div>
          </div>

          <div className="mobile-accordion-item">
            <div 
              className={`mobile-accordion-header ${expandedTab === 'class4' ? '' : 'inactive'}`}
              onClick={() => showClassDetails('class4')}
            >
              <h3>Class 4</h3>
              <i className={`fas fa-chevron-down accordion-icon ${expandedTab === 'class4' ? 'active' : ''}`}></i>
            </div>
            <div className={`mobile-accordion-content ${expandedTab === 'class4' ? 'active' : ''}`}>
              <p>
                In Class 4, students continue to expand their knowledge in English, Mathematics, Environmental Studies (EVS), Science, and Hindi, with a focus on more complex concepts. In English, students learn to write descriptive essays and engage in group discussions. Mathematics covers topics like fractions, geometry, and basic algebra, helping students sharpen their logical thinking. EVS lessons explore topics such as plant reproduction, ecosystems, and human impact on the environment. Science focuses on the states of matter, electricity, and simple machines, encouraging students to experiment and observe. Hindi lessons involve reading and analyzing short stories, while expanding vocabulary and grammar skills to foster fluency in the language.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-name">
          <h2>ST.JOSEPH'S L.P. SCHOOL,</h2><h2 id="h">KUTTIKKANAM</h2>
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

export default Academics;