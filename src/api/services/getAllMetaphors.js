import axiosClient from '../axios';

export default function GetAllMetaphors(){
    return axiosClient.get('/all-metaphors');
}