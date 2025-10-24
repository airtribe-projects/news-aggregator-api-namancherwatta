import axios from "axios";
import dotenv from "dotenv";
import { setCachedNews } from "./newscache.js";

dotenv.config();

const url = "https://gnews.io/api/v4/top-headlines?lang=en&max=5";
const news_api_key = process.env.NEWS_KEY;

const updateCachePeriodically = async () => {
  try {
    const response = await axios.get(`${url}&apikey=${news_api_key}`);
    await setCachedNews(response.data.articles);
    console.log("News cache updated:", new Date().toLocaleTimeString());
  } catch (error) {
    console.error("Failed to update news cache:", error.message);
  }
};

setInterval(updateCachePeriodically, 10 * 60 * 1000);

updateCachePeriodically();

export default updateCachePeriodically;
