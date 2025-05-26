import axios from 'axios';
import { PUBLIC_API_URL } from '$env/static/public';

const APIInstance = axios.create({
    baseURL: PUBLIC_API_URL,
});

export default APIInstance;
