import axios from "axios"
import dotenv, { config } from "dotenv"
import userModel from "../model/userModel.js";
dotenv.config()
let url="https://gnews.io/api/v4/top-headlines?lang=en&max=5"
let news_api_key=process.env.NEWS_KEY
const getNews=async (req,res)=>{
    const email=req.body.userEmail
    
    try {
        const fromDB= await userModel.findOne({email})
        const prefers=fromDB.preferences
        let news=[]
        if(prefers.length>0){
           for (const prefer of prefers) {
                const response = await axios.get(`${url}&category=${prefer}&apikey=${news_api_key}`);
                //console.log(response.data.articles)
                 news.push(...response.data.articles)
            }       
        }else{
            const response = await axios.get(`${url}&category=general&apikey=${news_api_key}`);
            news.push(...response.data.articles)
        }

        return res.status(200).json({news:news})
    } catch (error) {
        console.error("Error in News controller: "+error)
        return res.status(400).json({message:error})
    }
}

export {getNews}