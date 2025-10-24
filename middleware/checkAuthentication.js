import jwt from "jsonwebtoken";

const check_authentication = (req, res, next) => {
  try {
   
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing token" });
    }

    const token = authHeader.split(" ")[1];
   
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    
    req.body.userEmail = decoded.email;

    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default check_authentication;
