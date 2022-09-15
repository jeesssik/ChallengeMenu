import { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import swal from 'sweetalert';
import DishItem from './DishItem';
import FormSearch from './FormSearch';
import Spinner from '../../commons/Spinner';

const DishSearch = () => {

  const [dishes, setDishes] = useState([])
  const [search, setSearch] = useState(false);
  const KEY_API = import.meta.env.VITE_API_KEY;
  const URL_API = import.meta.env.VITE_URL_API;

  return (
    <>
      <Formik 
            initialValues={{
                inputSearch: '',
            }}

            validate={(value) => {
                let errors = {};
                //Validación de la busqueda
                if(!value.inputSearch) {
                  errors.inputSearch = 'please enter a dish to search';
                }else if(value.inputSearch.length < 3) {
                  errors.inputSearch = 'The name of the dish must have more than two characters'
                }
                return errors;
            }}

            onSubmit={(value, { resetForm }) => {
              setSearch(true);
              setDishes([]);
              //Aqui la llamada a la API.
              axios.get(`${URL_API}complexSearch?apiKey=${KEY_API}&query=${value.inputSearch}&addRecipeInformation=true`)
                .then(function (response) {
                  response.data.results.length === 0 
                  ? 
                  setTimeout(() => {
                    swal("Oops!", "No dishes with that name were found", "error");
                    resetForm();
                  },2201)
                  :
                    setDishes(response.data.results);
                    resetForm();
                })
                .catch((error) => {
                  console.log(error)
                })
                .finally(setTimeout(() => {
                  setSearch(false);
                }, 2200));
            }}
        >
          {( { errors }) => (   
            <FormSearch errors={errors} />
          )}
      </Formik> 

        <section className='container mt-5'>
          <>
            {search 
              ?
                <Spinner />
              :
                <div id='aqui' className='grid'>
                  {dishes.map((dish) => {
                    return <DishItem 
                            key={dish.id}
                            dish={dish}
                          />
                  })}
                </div>
            }
          </>
        </section>
    </>
  )
}

export default DishSearch;


