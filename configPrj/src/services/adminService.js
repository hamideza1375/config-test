import { axios, localhost } from '../other/utils/axios/axios'


export const sendQuitForSeller = (productId,number,SpecificationsSoldId) => axios.post(`${localhost}/sendQuitForSeller?productId=${productId}&&number=${number}&&SpecificationsSoldId=${SpecificationsSoldId}` )
