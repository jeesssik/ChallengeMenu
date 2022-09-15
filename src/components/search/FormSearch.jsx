import { Form, Field, ErrorMessage } from "formik";
import cooking from '../../assets/cooking.png';

const FormSearch = ({ errors }) => {
  
  return (
    <div className="container">
      <div className="row">
          <div className="col-sm-12 col-md-6">
            <img className="d-flex img-fluid" src={cooking} alt="Imagen de cocina" style={{width: '400px'}} />
          </div>

          <Form className='d-flex flex-column justify-content-center col-sm-12 col-md-6 container'>
          <h1 className="mb-3 fw-normal">Dish finder for the menu</h1>

            <div className=" mb-3 form-search">
              <label className='text-sm-center form-label' htmlFor="inputSearch">Name of the dish</label>
              <Field 
                className="form-control" 
                name="inputSearch" 
                type="text" 
                id="floatingInput" 
              />
              <ErrorMessage name='inputSearch' component={() => (<div className="alert alert-danger" role="alert">{errors.inputSearch}</div>) }/>

            <button className="mt-3 w-100 btn btn-secondary" type="submit">Search</button>
            </div>

        </Form>
      </div>
    </div>
  )
}

export default FormSearch;