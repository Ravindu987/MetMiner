import axiosClient from '../axios';

export default function SearchAllMetaphorsPoet(inputValue, inputSelect){
    return axiosClient.post('/search-all-metaphors-poet', {
        word: inputValue,
        poet: inputSelect
    });
}