import axiosClient from '../axios';

export default function SearchMetaphorsByPoet(inputSelect){
    return axiosClient.post('/metaphors-by-poet', {
        poet: inputSelect
    });
};