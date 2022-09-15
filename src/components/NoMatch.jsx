import { Link } from 'react-router-dom';
import notFound from '../assets/notFound.png'

const NoMatch = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="vh-100 d-flex flex-column justify-content-top align-items-center error-template">
                        <img className="img-fluid mt-5" src={notFound} alt="Imgaen de error 404" style={{width: '400px'}}/>
                        <h1>Oops!</h1>
                        <h2>404 Not Found</h2>
                        <div className="mt-4 error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        <div className="mt-4 error-actions">
                            <Link to="/login" className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>Take Me Home </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default NoMatch;