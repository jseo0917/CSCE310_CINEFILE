import axios from 'axios'

const API_URL = "http://localhost:8080/genres";

class Client{
    getUsers(){
        axios.get(API_URL);
    }
}

export default new Client();