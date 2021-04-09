import axios from 'axios'

export default axios.create({
  method: 'GET',
  baseURL: 'https://free-news.p.rapidapi.com/v1/search',
  headers: {
    'x-rapidapi-key': process.env.VUE_APP_FREENEWS_KEY,
    'x-rapidapi-host': 'free-news.p.rapidapi.com'
  }
})