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

export { userRegister };
