

import {AppContext} from '../App'
import {useEffect, useContext} from 'react'
import { forecasts } from '../redux/action'
import {connect} from 'react-redux'


const Weather5DayForecast = (props)=>{

    const {cityKey,celsius} = useContext(AppContext)

    const style = {
        width:'80vw',
        height:'400px',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
    }
    const card = {
        border:'1px solid black'
    }
    
    
    useEffect(()=>{
    if(cityKey){
        props.getForcast(cityKey,celsius)
    }
    },[props.citiesApi])
    

    return(
        <div className='forecast-container' style={style} >
            {props.forcast.map((e,ind)=>{
                return(
                    <div style={card} key={e.Date}>
                            <p>{e.Date}</p>
                        <div>
                            <h4>Day</h4>
                            <p>{(e.Temperature.Maximum.Value + e.Temperature.Minimum.Value)/2} {e.Temperature.Minimum.Unit}°</p>
                            <img src={`https://developer.accuweather.com/sites/default/files/${e.Day.Icon>10?e.Day.Icon:'0'+e.Day.Icon}-s.png`} alt={e.Day.IconPhrase}></img>
                            <p>{e.Day.IconPhrase} </p>
                        </div>
                        <div>
                            <h4>Night</h4>
                            <img src={`https://developer.accuweather.com/sites/default/files/${e.Night.Icon>10?e.Night.Icon:'0'+e.Night.Icon}-s.png`} alt={e.Night.IconPhrase}></img>
                            <p>{e.Night.IconPhrase} </p>
                        </div>
                    </div>
                )
            })}
            
        </div>




    )
}


const statePropsToState = (state)=>{
    return {
      citiesApi: state.cityName,
      weatherApi : state.cityWeather,
      forcast: state.forcast
    }
  } 
  const stateDispatchToProps = (dispatch)=>{
    return {
        getForcast : (e,celsius)=>dispatch(forecasts(e,celsius)),
    }
  } 
  
export default connect(statePropsToState,stateDispatchToProps)(Weather5DayForecast)
