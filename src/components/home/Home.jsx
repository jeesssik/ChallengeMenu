import { useContextMenu } from '../../context/useContextMenu';
import MenuTable from './MenuTable';
import home from '../../assets/home.png';
import { Link } from 'react-router-dom';

const Home = () => {

  const { dishList, removeDishItem, priceTotal, averageReadyIn, averageHealtScore, clearDishMenu } = useContextMenu();

  return (
    <div className="container">
      <div className="row">
        <div className='d-flex flex-column justify-content-center  col-sm-12 col-md-6'>
          <h1 className='mt-5'>Hotel menu</h1>
          <h2 className='mt-2'>Custom menu</h2>
          <p>The process of preparing a general menu program allows the server to always have preparations that meet the needs of the user, both energy requirements, nutrients and sensory satisfaction, fulfilling their expectations.</p>
          <Link to={'/search'}>
            <button className="btn btn-outline-secondary" type="submit">Go to search</button>  
          </Link>
        </div>
        <div className="col-sm-12 col-md-6">
          <img className='img-fluid' src={home} alt='Imagen de hamburguesa' />
        </div>
      </div>

      {dishList.length === 0
      ?
        <div className="alert alert-danger mt-5" role="alert">
          There are no dishes on the menu yet - Go to Search Recipes to add dishes...
        </div>
      :
        <MenuTable 
          dishList={dishList} 
          removeDishItem={removeDishItem} 
          priceTotal={priceTotal} 
          averageReadyIn={averageReadyIn} 
          averageHealtScore={averageHealtScore} 
          clearDishMenu={clearDishMenu}
        />
      }
    </div>
  )
}

export default Home;
