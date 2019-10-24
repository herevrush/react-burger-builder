import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-80aec.firebaseio.com/'
});


export default instance;
