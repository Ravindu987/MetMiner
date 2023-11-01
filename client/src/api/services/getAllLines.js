import axiosClient from '../axios';

export default function GetAllLines(){
    return axiosClient.get('/all-lines');
}