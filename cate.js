import axios from '@/utils/myaxios.js'


export const getCateList =() =>{
    return axios ({
        url : '/category'
    })
}