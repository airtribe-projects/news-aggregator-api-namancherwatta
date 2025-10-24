import axios from "axios"
import dotenv, { config } from "dotenv"
import userModel from "../model/userModel.js";
import { getCachedNews,setCachedNews } from "../cache/newscache.js";

dotenv.config()
let url="https://gnews.io/api/v4/top-headlines?lang=en&max=5"
let news_api_key=process.env.NEWS_KEY
const getNews=async (req,res)=>{
    const email=req.body.userEmail
    
    try {
        const fromDB= await userModel.findOne({email})
        const prefers=fromDB.preferences
        let news=[]
        let articles = (await getCachedNews()) || [];

        if(prefers.length>0){
           for (const prefer of prefers) {
                const catArticles = articles.filter(a => a.category === prefer);
                if (catArticles.length === 0) {
                    const response = await axios.get(`${url}&category=${prefer}&apikey=${news_api_key}`);
                    news.push(...response.data.articles)
                }else{
                    news.push(...catArticles)
                }
            }       
        }else{
            const response = await axios.get(`${url}&category=general&apikey=${news_api_key}`);
            news.push(...response.data.articles)
        }
        if (!articles || news.length > articles.length) {
            await setCachedNews([...articles, ...news]);
        }
        return res.status(200).json({news:news})
    } catch (error) {
        console.error("Error in News controller: "+error)
        return res.status(400).json({message:error})
    }
}

const markRead = async (req, res) => {
  const email = req.body.userEmail;
  const articleId = req.params.id;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.readArticles.includes(articleId)) {
    user.readArticles.push(articleId);
    await user.save();
  }

  res.status(200).json({ message: "Marked as read" });
};

const markFavorite = async (req, res) => {
  const email = req.body.userEmail;
  const articleId = req.params.id;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.favoriteArticles.includes(articleId)) {
    user.favoriteArticles.push(articleId);
    await user.save();
  }

  res.status(200).json({ message: "Marked as favorite" });
};

const getReadArticles = async (req, res) => {
  const email = req.body.userEmail;
  const user = await userModel.findOne({ email });
  res.status(200).json({ articles: user.readArticles });
};

const getFavoriteArticles = async (req, res) => {
  const email = req.body.userEmail;
  const user = await userModel.findOne({ email });
  res.status(200).json({ articles: user.favoriteArticles });
};



export {getNews,getReadArticles,getFavoriteArticles,markFavorite,markRead}