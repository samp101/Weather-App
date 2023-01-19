import { connect } from "react-redux"
import { useEffect, useState ,useContext} from "react"
import {onOpening, createSearch} from '../redux/action'
import Weather5DayForecast from "./Weather5DayForecast"
import { AppContext } from "../App"
import { addToStorage } from '../localStorangeFunc'
import { Link } from "react-router-dom"
import InputBar from "../subComponents/InputBar"
import SelectedCity from "../subComponents/SelectedCity"
import './MainDisplay.css'

const MainDisplay = (props) => {


    const {cityKey} = useContext(AppContext)
    
    const [userSearch,setUserSearch]= useState('')

    useEffect(()=>{
        props.callOnOpening()
    },[])

    return(
        <main className="main-container">
            <section className='current-day-container'>
              <SelectedCity/>
            </section>
            <section className="right-container" >
              <InputBar />
              <Weather5DayForecast/>
            </section>
        </main>
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
  
export default connect(statePropsToState,stateDispatchToProps)(MainDisplay)














// fetch('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=k9vouwlSLpmabFBzS2jCJCSDvzTyTNyw&q=betshemesh')
//         .then(res=>res.json())
//         .then(data=>{
//         setLocation({
//             cityKey:data[0].Key,
//             name:data[0].EnglishName,
//             countryId: data[0].Country.EnglishName})
//             return fetch(`http://dataservice.accuweather.com/currentconditions/v1/${data[0].Key}?apikey=k9vouwlSLpmabFBzS2jCJCSDvzTyTNyw`)
//             .then(res=>res.json())
//             .then(data=>setWeather(data))
//             .catch(e=>console.log(e))
            
//         })
//         .catch(e=>console.log(e))
    
//     }
//     getWeather()