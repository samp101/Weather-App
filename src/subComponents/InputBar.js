import {connect} from 'react-redux'
import {onOpening, createSearch} from '../redux/action'
import { useEffect, useState ,useContext} from "react"
import { AppContext } from "../App"
import { addToStorage } from '../localStorangeFunc'



const InputBar = (props) =>{
    const {cityKey,celsius,setCelsius} = useContext(AppContext)
    const [userSearch,setUserSearch]= useState('')

    const changeMetric = ()=>{
      celsius ? setCelsius(false): setCelsius(true)
    } 
    
    return(
        <div className='InputBar'>
            <input type='text' placeholder='Search The Weather' onChange={(e)=>setUserSearch(e.target.value)}></input>
            <input type='submit' value='Search The Weather' onClick={()=>props.createSearch(userSearch)}></input>
            <input type='submit' value='Change Degrees' onClick={changeMetric}></input>
            <input type='submit' value='Add to favourites' onClick={()=>addToStorage(cityKey,props.citiesApi.name)}  ></input>
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
  
export default connect(statePropsToState,stateDispatchToProps)(InputBar)

