import { Link } from 'react-router-dom';
import { useContextMenu } from '../../context/useContextMenu';

const DishItem = ({ dish }) => {

  const { id, image, title, vegan } = dish;
  const { addDishMenu, removeDishItem, dishList } = useContextMenu();

  const onAdd =() => {
    addDishMenu(dish);
  }

  const onRemove = () => {
    removeDishItem(dish)
  }

  return (
    <div className="card">
        <Link to={`/detalle/${id}`}>
          <img src={image} className="card-img-top" alt={title} />
        </Link>
        <div className="card-body">
            <h5 className="text-center card-title">{title}</h5>
            <p className="text-center card-text">
                {vegan ? "Vegan": "Not vegan"}
            </p>

            {dishList.some(p => p.id === dish.id) 
              ?
                <button className='mt-2 w-100 btn btn-warning' onClick={() => onRemove()}>Remove From Menu</button>
              :
                <button className='mt-2 w-100 btn btn-primary' onClick={() => onAdd()}>Add to menu</button>
            }
                    
            <Link to={`/detalle/${id}`}>
              <button className="mt-2 w-100 btn btn-outline-secondary">See details</button>
            </Link> 

            <Link to={`/home`}>
              <button className="mt-2 w-100 btn btn-outline-secondary">See Menu</button>
            </Link> 
        </div>
    </div>
  )
}

export default DishItem;
