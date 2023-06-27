// instances
import axios from 'axios';

// models
const NewsApi = {
  async getNews(): Promise<any> {
    const res = await axios.get('http://newsapi.org/v2/everything?q=автомобіль&apiKey=d8a6859a61f142c28ec762eaca193bae');
    return res.data;
  },

};

export default NewsApi;
