import axios from 'axios';

export default axios.create({
  baseURL: "http://1e27d8a9549d.ngrok.io" // this is an ngrok url that only lasts 8 hours.
})