import { Link, NavLink } from 'react-router-dom';
import { useContextAuth } from '../context/useContextAuth';
import food from '../assets/food.svg';

const Navbar = () => {

    const { token, handleLogout } = useContextAuth();

    return (
        <nav className="border-bottom container-fluid navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to={'/home'}><img style={{ width: '100px' }} className='img-fluid' src={food} alt='Logo de comida' /></Link>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={({isActive}) => isActive ? 'nav-link active' : "nav-link"} aria-current="page" to={"/home"}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            
                            <NavLink className={({isActive}) => isActive ? 'nav-link active' : "nav-link"} to={"/search"}>Dish Search</NavLink>
                        </li>

                    </ul>
                    <form className="d-flex">
                        {token && (
                            <button className="btn btn-outline-danger" type="submit" onClick={()=>{handleLogout()}}>LogOut</button>
                        )}
                        
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;