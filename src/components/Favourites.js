import { AppContext } from "../App";

import {useEffect, setState, useContext} from 'react'
import {getFromStorage} from '../localStorangeFunc'
import {connect} from 'react-redux'
import {addToFavourites,deleteCity,deleteAll} from '../redux/action'




const Favourites = (props) => {
    
    const favs = getFromStorage()||[]

    useEffect(()=>{
    favs.map(city => props.createSearch1(city.cityKey,city.name))
    },[])

    const deleteCity = (e)=>{
        // const newFav = favCity.filter(e=>!e.cityName==e)
        // console.log(newFav);
        // setFavCity(newFav)
    }

    return(
        <div>
            <div>
            <button onClick={()=>props.deleteAllFavCity()}>Delete All Favourites</button>

                {props.weatherApi.map((e,i)=>{
                    let cityName = e.cityName
                return(
                    <div key={i}>
                            <button onClick={(e)=>props.deleteFavCity(cityName)}>X</button>
                            <h1>{e.cityName}</h1>
                            <p>{e.Temperature.Metric.Value} {e.Temperature.Metric.Unit}°</p>
                            <img src={`https://developer.accuweather.com/sites/default/files/${e.WeatherIcon>10?e.WeatherIcon:'0'+e.WeatherIcon}-s.png`} alt={e.WeatherText}></img>
                            <p>{e.WeatherText}</p>
                        </div>
                        )
                    })}
            </div>   



    </div>
    )


}

const statePropsToState = (state)=>{
    return {
      weatherApi : state.fav

    }
  } 
  const stateDispatchToProps = (dispatch)=>{
    return {
        createSearch1: (cityKey,cityName)=>dispatch(addToFavourites(cityKey,cityName)),
        deleteFavCity: (cityName)=>dispatch(deleteCity(cityName)),
        deleteAllFavCity: ()=>dispatch(deleteAll()),
    }
  } 
export default connect(statePropsToState,stateDispatchToProps)(Favourites)


