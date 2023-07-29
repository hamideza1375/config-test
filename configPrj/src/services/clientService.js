import { axios, localhost } from '../other/utils/axios/axios'


export const getSlider = async () => axios.get(`${localhost}/getSlider`)
