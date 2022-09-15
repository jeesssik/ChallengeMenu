import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useContextMenu } from "../../context/useContextMenu";
import axios from "axios";
import Spinner from "../../commons/Spinner";

const DishItemDetail = () => {

    const [dishData, setDishData] = useState({});
    const { dishList, addDishMenu, removeDishItem, } = useContextMenu();
    const { title, image, summary, instructions, dairyFree, glutenFree, vegan, vegetarian, veryHealthy } = dishData;
    const [loading, setLoading] = useState(false);
    const { dishId } = useParams();
    const KEY_API = import.meta.env.VITE_API_KEY;
    const URL_API = import.meta.env.VITE_URL_API;

    useEffect(() => {
        setLoading(true);
        axios.get(`${URL_API}${dishId}/information?apiKey=${KEY_API}`)
        .then(function (response) {
            setDishData(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(setTimeout(() => {
            setLoading(false);
        }, 2200))
    }, [dishId])
    
    return (
        <>
            {
                loading 
                ?
                    <div className="position-relative vh-100">
                        <div className='position-absolute top-50 start-50 translate-middle'>
                            <Spinner  />
                        </div>
                    </div>
                :
                    <div className="container">
                        <h1 className="text-center mt-5">{title}</h1>
                        <div className="text-center">
                            <img className="img-fluid rounded border mt-3" src={image} alt={title} />
                        </div>

                        <h2 className="text-center mt-5">Dish Summary</h2>
                        <p className="m-auto mt-3" dangerouslySetInnerHTML={{ __html: summary }}></p>

                        <h2 className="text-center mt-5">Recipe Instructions</h2>
                        <div className="mt-3" dangerouslySetInnerHTML={{__html: instructions}}></div>

                        
                        
                        <div className="d-flex flex-column flex-md-row justify-content-center  mb-5 ">
                            <div className="me-4">
                                <h2 className="text-center mt-5">Other data</h2>
                                <ul className="text-center mt-3 list">
                                    <li><span className="fw-bold">Dairy Free:</span> {dairyFree ? " Yes." : " No."}</li>
                                    <li><span className="fw-bold">Gluten Free:</span> {glutenFree ? " Yes." : " No."}</li>
                                    <li><span className="fw-bold">Vegan:</span> {vegan ? " Yes." : " No."}</li>
                                    <li><span className="fw-bold">Vegetarian:</span> {vegetarian ? " Yes." : " No."}</li>
                                    <li><span className="fw-bold">Very Healthy:</span> {veryHealthy ? " Yes." : " No."}</li>
                                </ul>
                            </div>
                        
                            <div className="text-center ms-4">
                                <h2 className="mt-5">Actions</h2>
                                {dishList.some(dish => dish.id === dishData.id) 
                                    ?
                                        <button className='mt-3 w-100 btn btn-warning' onClick={() => removeDishItem(dishData)}>Remove From Menu</button>
                                    :
                                        <button className='mt-3 w-100 btn btn-primary' onClick={() => addDishMenu(dishData)}>Add to menu</button>
                                }
                                <Link to={`/search`}>
                                    <button className="mt-2 w-100 border btn btn-outline-secondary">Return Search</button>
                                </Link>  
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default DishItemDetail;