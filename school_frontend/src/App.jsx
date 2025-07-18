import { useState } from "react";
import SchoolHome from "./components/school_home";
import { Route, Routes } from "react-router-dom";
import Aboutus from "./components/aboutus";
import Academics from "./components/Academics";
import ContactUs from "./components/ContactUs";
import Gallery from "./components/Gallery";
import Admission from "./components/Admission";
import Staffs from "./components/Staffs";
import { ParallaxProvider } from "react-scroll-parallax";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
     <ParallaxProvider>
      <Routes>
        <Route path="/" element={<SchoolHome />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/staffs" element={<Staffs />} />
      </Routes>
    </ParallaxProvider>
    </>
  );
}

export default App;
