import {connect} from 'react-redux'
import {onOpening, createSearch} from '../redux/action'
import { useEffect, useState ,useContext} from "react"
import { AppContext } from "../App"
import { addToStorage } from '../localStorangeFunc'
import InputBar from './InputBar'


const SelectedCity = (props) =>{

    const {celsius} = useContext(AppContext)
    
    return(
        <div className='current-day'>
            <h3>{props.citiesApi.name}</h3><h4>{props.citiesApi.countryId}</h4>
                {props.weatherApi.map((e,i)=>{
                    return(
                    <div key={i}>
                        {celsius == true ? <p>{e.Temperature.Metric.Value} {e.Temperature.Metric.Unit}°</p>
                                         : <p>{e.Temperature.Imperial.Value} {e.Temperature.Imperial.Unit}°</p>
                        }
                        <img src={`https://developer.accuweather.com/sites/default/files/${e.WeatherIcon>10?e.WeatherIcon:'0'+e.WeatherIcon}-s.png`} alt={e.WeatherText}></img>
                        <p>{e.WeatherText}</p>
                    </div>
                    )
                })}
        </div>
    )

}



const statePropsToState = (state)=>{
    return {
      citiesApi: state.cityName,
      weatherApi : state.cityWeather
    }
  } 
  const stateDispatchToProps = (dispatch)=>{
    return {
        callOnOpening: ()=>dispatch(onOpening()),
        createSearch: (e)=>dispatch(createSearch(e)),
    }
  } 
  
export default connect(statePropsToState,stateDispatchToProps)(SelectedCity)

