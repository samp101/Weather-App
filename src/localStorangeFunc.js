export const addToStorage = (cityKey,name) =>{
    const city = JSON.parse(localStorage.getItem('cities'))||[]
    if (city.some(e=>e.cityKey==cityKey)) return alert(`${name} is already in Favourites.`)
    city.push({cityKey,name})
    return localStorage.setItem('cities',JSON.stringify(city))
   
}

export const getFromStorage = () =>{
    const city = JSON.parse(localStorage.getItem('cities'))||[]   
    return city
}