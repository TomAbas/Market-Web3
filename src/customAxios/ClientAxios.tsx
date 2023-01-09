import axios from 'axios';
import { API_ENDPOINT } from '../constants/api';

const ClientAxios = axios.create({ baseURL: API_ENDPOINT });

export default ClientAxios;
