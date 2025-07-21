
import jwt from "jsonwebtoken";


const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}


const adminLogin=async (req,res) => {
  try {
    

  } catch (error) {
    
  }try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
  
}

export {adminLogin}