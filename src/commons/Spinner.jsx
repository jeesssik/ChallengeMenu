const Spinner = () => {
  
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mb-5 ">
        <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <p className='mt-1 fs-5'>Loading...</p>
    </div>
  )
}

export default Spinner;