import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken"
const userRegister = async (req, res) => {
  try {
    const { name, email, password,preferences } = req.body;
    console.log(req.body)
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const dbUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      preferences
    });

    dbUser.password = "XXX";

    return res.status(200).json({
      message: "User registered successfully",
      user: dbUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const userLogin= async (req,res)=>{
  try {
    const { email, password } = req.body;
    if(!email || !password){
      res.status(400).json({message:"All fields are required"})
    }
    const userexists = await userModel.findOne({ email });
    if (!userexists) {
      return res.status(400).json({ message: `User with this email ${email} does not exist` });
    }
    const passwordcheck = await bcrypt.compare(password,userexists.password)
    console.log(passwordcheck)
    if(passwordcheck){
      const jwt_token=jwt.sign({"email":userexists.email,"name":userexists.name},process.env.JWT_KEY,{ expiresIn: "1h" })
      return res.status(200).json({message: `Hi ${userexists.name}, you have logged in.`, token:jwt_token})
    }else{
      return res.status(401).json({message: "Please type correct password."})
    }

  } catch (error) {
    console.error("Error logging in user:",error)
    return res.status(500).json({message: "Server error",error})
  }
}

const getPreferences=async(req,res)=>{
  const email=req.body.userEmail
  if(!email){
    return res.status(400).json({message:"Email is required"})
  }
  console.log(email)
  const fromDB= await userModel.findOne({email})
  
  if(!fromDB){
    return res.status(404).json({message:"User does not exists"})
  }
  const prefers=fromDB.preferences
  return res.status(200).json({preferences:prefers})

}

const updatePreferences=async(req,res)=>{
 const email=req.body.userEmail
 const preferences=req.body.preferences
  if(!email|| !preferences){
    return res.status(400).json({message:"Email/Preferences are required"})
  }
  const fromDB= await userModel.findOne({email})
 if(!fromDB){
    return res.status(404).json({message:"User does not exists"})
  }
  const updated_user= await userModel.findByIdAndUpdate(fromDB._id,{preferences:preferences}, { new: true })
  return res.status(200).json({updated_user})
}

export { userRegister,userLogin,getPreferences,updatePreferences };
