import express from "express"
import userRoute from "./routes/v1/userRoute.js"
import newsRoute from "./routes/v1/newsRoute.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()
const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   console.log("Incoming body:", req.body);
//   next();
// });


app.use("/api/v1/users",userRoute)
app.use("/api/v1/news",newsRoute)
app.get("/",(req,res)=>{
    res.send("Hello!!")
})

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(port, () => console.log(`Server is listening on ${port}`));
})
.catch((err) => console.error("❌ MongoDB connection error:", err));



export default app;