import axiosClient from '../axios';

export default function SearchAll(inputValue){
    return axiosClient.post('/search-all', {
        word: inputValue
    });
}