import React from 'react'
import { Link } from 'react-router-dom';

const GroundLayout = ({data}) => {
  return (
    <>
      <div className="row" style={{margin : "0% 2% 0% 2%"}} >
    {data.map((val) => (
      <div  key={val._id}className="col-lg-3 col-md-4 col-sm-6" style={{marginTop : "2.5%"}}>
            <div className="card h-100">
                    <img src={val.image} className="card-img-top" alt="Hollywood Sign on The Hill" style={{
                      width :  "100%", /* Set a fixed width */
                        // height: "auto", /* Maintain the aspect ratio */
                        height: '50%', // Set a minimum height for the image
                    }}/>

                <div className="card-body" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h5 className="card-title" style={{ display: "inline" }}>{val.name}</h5>
                    <p className="card-text">{val.Ratings}⭐</p> {/* Rating in the top right */}
                  </div>
                  <p className="card-text">{val.city}</p>
                  <p className="card-text">{val.price} Rs.</p>
                  <Link to={`/moreground/${val._id}`} className="btn btn-primary" style={{ marginBottom: "0%" }}>
                  Show More
                  </Link>

                </div>
            </div>
        </div> 
    ))}

    </div>    
    </>
  )
}

export default GroundLayout
