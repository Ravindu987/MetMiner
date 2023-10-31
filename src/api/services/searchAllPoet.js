import axiosClient from '../axios';

export default function SearchAllPoet(inputSelect){
    return axiosClient.post('/search-all-poet', {
        poet: inputSelect
    });
}