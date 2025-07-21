import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import "./school.css";

const Staffs = () => {
    // --- React State for dynamic data and filtering ---
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeFilter, setActiveFilter] = useState('teaching'); // Default filter

    // --- State for mobile menu ---
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // --- Fetch Staff Data from Backend ---
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/staff/all`);
                if (response.data.success) {
                    setStaffList(response.data.staff);
                } else {
                    setError("Could not fetch staff data.");
                }
            } catch (err) {
                console.error("Error fetching staff:", err);
                setError("An error occurred while fetching staff data.");
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);

    // --- Mobile Menu Logic (from your original code) ---
    useEffect(() => {
        const handleResize = () => {
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
            if (nav && hamburger && !nav.contains(event.target) && !hamburger.contains(event.target) && isMenuOpen) {
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

    // --- Handle Filter Clicks ---
    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    return (
        <div>
            <style jsx>{`
                /* Your existing CSS is preserved */
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
                  background-color: #f7f7f7;
                }
                .container {
                  width: 80%;
                  max-width: 1200px;
                  margin: 0 auto;
                }
                /* --- UPDATED STYLES START HERE --- */
                .staff-photos img {
                  width: 100%;
                  height: 300px; /* Rectangular aspect ratio */
                  border-radius: 8px; /* Slightly rounded corners */
                  display: block;
                  object-fit: cover;
                  object-position: top; /* Focus on the top of the image */
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
                  grid-template-columns: repeat(4, 1fr); /* Changed to 4 columns to match example */
                  gap: 25px;
                }
                .photo {
                  height: auto;
                  animation: SclAnimation 0.4s ease;
                  /* Logic to hide/show based on activeFilter */
                  display: none;
                }
                .photo[data-name="${activeFilter}"] {
                    display: block; /* This CSS rule handles the filtering */
                }
                .staff-info {
                    margin-top: 1rem;
                }
                .staff-name {
                    font-weight: 600;
                    color: #222;
                    font-size: 1.1rem;
                }
                .staff-designation {
                    color: #555;
                    font-size: 0.95rem;
                    margin-top: 0.25rem;
                }
                /* Styles for the placeholder icon */
                .placeholder-icon-container {
                  width: 100%;
                  height: 300px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #e5e7eb; /* Light gray background */
                  border-radius: 8px;
                }
                .placeholder-icon-container svg {
                  width: 80px;
                  height: 80px;
                  color: #9ca3af; /* Darker gray for the icon */
                }
                @keyframes SclAnimation {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                /* --- UPDATED STYLES END HERE --- */
                @media (max-width: 1024px) {
                  .container {
                    width: 90%;
                  }
                  .photos-group {
                    grid-template-columns: repeat(3, 1fr);
                  }
                  .item-links {
                    width: 90%;
                  }
                }
                @media (max-width: 991px) {
                  .photos-group {
                    grid-template-columns: repeat(2, 1fr);
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
                    flex-direction: column; /* Stack filters on small screens */
                    gap: 15px;
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

            <div className="staff_details">
                <div className="container">
                    <div className="item-links">
                        <span
                            className={`item-link ${activeFilter === 'teaching' ? 'menu-active' : ''}`}
                            onClick={() => handleFilterClick('teaching')}
                        >
                            Teaching Staff
                        </span>
                        <span
                            className={`item-link ${activeFilter === 'non teaching' ? 'menu-active' : ''}`}
                            onClick={() => handleFilterClick('non teaching')}
                        >
                            Non-Teaching Staff
                        </span>
                    </div>

                    <div className="staff-photos photos-group">
                        {loading && <p>Loading staff...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {!loading && !error && staffList.map(staff => (
                            <div className="photo" data-name={staff.type} key={staff._id}>
                                {staff.photoUrl ? (
                                    <img src={staff.photoUrl} alt={staff.name} />
                                ) : (
                                    <div className="placeholder-icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                                    </div>
                                )}
                                <div className="staff-info">
                                    <p className="staff-name">{staff.name}</p>
                                    
                                </div>
                            </div>
                        ))}
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
