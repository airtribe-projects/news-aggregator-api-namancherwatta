import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
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
    });

    dbUser.password = "XXX";

    return res.status(201).json({
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
      return res.status(200).json({message: `Hi ${userexists.name}, you have logged in.`})
    }else{
      return res.status(400).json({message: "Please type correct password."})
    }

  } catch (error) {
    console.error("Error logging in user:",error)
    return res.status(500).json({message: "Server error",error})
  }
}

export { userRegister,userLogin };
