import {apiKey} from '../keys'
import { initState } from './reducer'
export const GETCITYWEATHER = 'GETCITYWEATHER'
export const GETCITYNAME = 'GETCITYNAME'
export const FORECAST = 'FORECAST'
export const ADD_FAV = 'ADD_FAV'
export const DELETECITY = 'DELETECITY'
export const DELETEALL = 'DELETEALL'



export const onOpening = () => (dispatch,createStore)=> {
    try{
        fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=betshemesh`)
        .then(res=>res.json())
        .then(data=>{
            dispatch({
                type:GETCITYNAME,
                payload:data
            }) 
            console.log(data[0].Key);
            return fetch(`http://dataservice.accuweather.com/currentconditions/v1/${data[0].Key}?apikey=${apiKey}`)
                    .then(res=>res.json())
                    .then(data2=>{
                        return dispatch({
                            type:GETCITYWEATHER,
                            payload:data2
                        })
                    })
                    .catch(e=>console.log(e))})
    
        }
    catch(e){
        console.log(e)
    }

}

export const forecasts = (cityKey,celsuis) => (dispatch,createStore)=> {

    try{
        let unit;
        celsuis==true ? unit = 'true' : unit = 'false'
        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&metric=${unit}`)
                    .then(res=>res.json())
                    .then(data=>{
                        return dispatch({
                            type:FORECAST,
                            payload:data
                        })
                    })
                    .catch(e=>console.log(e))
    
        }
    catch(e){
        console.log(e)
    }

}
export const createSearch = (cityName) => (dispatch,createStore)=> {
    try{
        fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`)
        .then(res=>res.json())
        .then(data=>{
            dispatch({
                type:GETCITYNAME,
                payload:data
            }) 
        return fetch(`http://dataservice.accuweather.com/currentconditions/v1/${data[0].Key}?apikey=${apiKey}`)
            .then(res=>res.json())
            .then(data2=>{
                return dispatch({
                    type:GETCITYWEATHER,
                    payload:data2
                })
            })
            .catch(e=>console.log(e))})
    
    }
    catch(e){
        console.log(e)
    }

}

export const addToFavourites = (cityKey,cityName)=>(dispatch)=>{
    const checkForDouble = initState.fav.filter((e)=>e.cityName==cityName)
    if(checkForDouble.length>0) return 

    try{
        fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`)
        .then(res=>res.json())
        .then(data2=>{
                return dispatch({
                type:ADD_FAV,
                payload:data2[0],
                payload1:cityName
                })
            })
        .catch(e=>console.log(e))
        }
    catch(e){
            console.log(e)
        }
}

export const deleteCity = (cityName)=>{
    console.log('City Name=> ',cityName);
    return{
        type:DELETECITY,
        payload:cityName
    }
}
export const deleteAll = ()=>{
   return{
        type:DELETEALL
    }
}


