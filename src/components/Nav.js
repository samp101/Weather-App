import { Link } from "react-router-dom";


const Nav = ()=>{
    return(
        <div>
            <Link to={'/'}>Home</Link>
            <Link to={'/favourites'}>Favourite</Link>
        </div>
    )

}


export default Nav