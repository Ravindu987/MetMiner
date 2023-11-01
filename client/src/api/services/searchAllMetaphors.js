import axiosClient from '../axios';

export default function SearchAllMetaphors(inputValue){
    return axiosClient.post('/search-all-metaphors', {
        word: inputValue
    });
};