import axiosClient from '../axios';

export default function SearchAllByPoet(inputValue, inputSelect){
    return axiosClient.post('/search-all-by-poet', {
        word: inputValue,
        poet: inputSelect
    });
}