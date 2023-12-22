import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name : "", email : "", phone : "", password : "", cpassword : ""
  });

  let name,value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name] : value });
  }

  const postData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register" ,user,{headers: "application/json"});

    // const data = await res.json();
    if(res.data.error){

      console.log("Invalid");
      Swal.fire({
        title: 'Ooops!!!',
        text: 'Invalid Details',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      navigate('/register');

    }else{

      console.log("Success");
      Swal.fire({
        title: 'Congrats!!',
        text: 'Successfully Registered',
        icon: 'success',
        confirmButtonText: 'Okay'
      })
      navigate('/login');

    }

    } catch (error) {
      console.log(error)
    }
}

  return (
    <>
      <section className="vh-100" style={{backgroundColor: "#CCFFFF"
}}>
    <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: "1rem"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="Box Register Photo.jpg"
                alt="login form" className="img-fluid" style={{bordeRadius: "1rem 0 0 1rem" }} />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center" >
              <div className="card-body p-4 p-lg-5 text-black">

                <form className="form" onSubmit={postData} method='POST'>

                  <div className="d-flex align-items-center mb-1 pb-1">
                  <i className="fa-solid fa-baseball fa-spin fa-2xl" style= {{color: "#02baf7", height : "100"}}></i>
                  <img
                    src="Logo Box.png"
                    height="100"
                    alt="MDB Logo"
                    loading="lazy"
                  />
                  </div>

                  <h5 className="fw-normal mb-1 pb-0" style={{letterSpacing: "1px"}}>Register your account</h5>

                  <div className="form">
                  <label className="form-label">
                    <input type="text" name="name" className="form-control" style={{
                          width: "300px",
                          backgroundImage: "linear-gradient(#000, #000)",
                          backgroundPosition: "bottom 5px center",
                          backgroundSize: "calc(100% - 10px) 2px",
                          backgroundRepeat: "no-repeat",
                          backgroundColor: "#fcfcfc",
                          padding: "10px",
                          marginBottom : "10px",
                          borderStyle:"hidden"

                          
                    }}  placeholder='Input Your Name'
                        value = {user.name}
                        onChange={handleInputs}
                    />
                  </label>
                  </div>

                  <div className="form">
                  <label className="form-label">
                    <input type="email" name="email" className="form-control" style={{
                          width: "300px",
                          backgroundImage: "linear-gradient(#000, #000)",
                          backgroundPosition: "bottom 5px center",
                          backgroundSize: "calc(100% - 10px) 2px",
                          backgroundRepeat: "no-repeat",
                          backgroundColor: "#fcfcfc",
                          padding: "10px",
                          marginBottom : "10px",
                          borderStyle:"hidden"

                    }}  placeholder='Input Email'
                        value = {user.email}
                        onChange={handleInputs}
                    />
                  </label>
                  </div>


                  <div className="form">
                  <label className="form-label">
                    <input type="tel" name="phone" className="form-control" style={{
                          width: "300px",
                          backgroundImage: "linear-gradient(#000, #000)",
                          backgroundPosition: "bottom 5px center",
                          backgroundSize: "calc(100% - 10px) 2px",
                          backgroundRepeat: "no-repeat",
                          backgroundColor: "#fcfcfc",
                          padding: "10px",
                          marginBottom : "10px",
                          borderStyle:"hidden"

                    }}  placeholder='Input Your Phone Number'
                        value = {user.phone}
                        onChange={handleInputs}
                    />
                  </label>
                  </div>

                  <div className="form">
                  <label className="form-label">
                    <input type="password" name="password" className="form-control" style={{
                          width: "300px",
                          backgroundImage: "linear-gradient(#000, #000)",
                          backgroundPosition: "bottom 5px center",
                          backgroundSize: "calc(100% - 10px) 2px",
                          backgroundRepeat: "no-repeat",
                          backgroundColor: "#fcfcfc",
                          padding: "10px",
                          marginBottom : "10px",
                          borderStyle:"hidden"

                    }}  placeholder='Input Password'
                        value = {user.password}
                        onChange={handleInputs}
                    />
                  </label>
                  </div>

                  <div className="form">
                  <label className="form-label">
                    <input type="password" name="cpassword" className="form-control" style={{
                          width: "300px",
                          backgroundImage: "linear-gradient(#000, #000)",
                          backgroundPosition: "bottom 5px center",
                          backgroundSize: "calc(100% - 10px) 2px",
                          backgroundRepeat: "no-repeat",
                          backgroundColor: "#fcfcfc",
                          padding: "10px",
                          marginBottom : "10px",
                          borderStyle:"hidden"
                    }}  placeholder='Input Confirm Password'
                        value = {user.cpassword}
                        onChange={handleInputs}
                    />
                  </label>
                  </div>

                  <div className="pt-1 mb-0">
                    <button className="btn btn-dark btn-lg btn-block mb-0" type="submit">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Register
