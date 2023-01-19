import {GETCITYNAME, GETCITYWEATHER, FORECAST, ADD_FAV,DELETECITY,DELETEALL} from './action'
import { addToStorage,getFromStorage } from '../localStorangeFunc'


export const initState = {
    cityName:{},
    cityWeather:[],
    forcast:[],
    fav:[]
    
}


export const reducer = (state=initState,action={}) => {
    switch (action.type) {
        case GETCITYNAME :
            return{...state,cityName:{cityKey:action.payload[0].Key, name:action.payload[0].EnglishName, countryId: action.payload[0].Country.EnglishName}}
        case GETCITYWEATHER:
            return{...state,cityWeather:action.payload}
        case FORECAST:
            console.log('actions ', action.payload);
            return{...state,forcast:action.payload.DailyForecasts}
        case ADD_FAV:
            const obj = action.payload 
            obj.cityName=action.payload1
            state.fav.push(obj)
            return{...state,fav: [...state.fav]}
        case DELETECITY:
            const newFav = state.fav.filter((e)=> action.payload !== e.cityName)
            const localStorCity = JSON.stringify(getFromStorage().filter((e)=>e.name !== action.payload))
            localStorage.cities = localStorCity
            return{...state,fav:newFav}
        case DELETEALL:
            // const newFav = state.fav.filter((e)=> action.payload !== e.cityName)
            // const localStorCity = JSON.stringify(getFromStorage().filter((e)=>e.name !== action.payload))
            localStorage.cities = JSON.stringify([])
            return{...state,fav:[]}
            
        default:
            return{...state}
            
    }

}