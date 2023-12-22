import React, { useContext, useState } from 'react'
import axios from 'axios';
import { NavLink,useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { UserContext } from '../App';

const Login = () => {

  const {dispatch} = useContext(UserContext);

  const navigate = useNavigate();
  const [user, checkUser] = useState({
        email : "", password : ""
  });
  
  let name,value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    checkUser({...user, [name] : value });
  }

  const loginUser = async(e) => {

  e.preventDefault();

  try {

    const res = await axios.post("http://localhost:5000/login" , user,{headers: {
      'Content-Type' : "application/json"
    }
   },{withcredentials : true});

    const setCookie = (name, value, days) => {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = 'expires=' + date.toUTCString();
      document.cookie = name + '=' + value + ';' + expires + ';path=/';
    };
    
  // console.log(res.cookie);
  if(res.data.error){

    console.log("Invalid");
    Swal.fire({
      title: 'Ooops!!!',
      text: 'Invalid Details',
      icon: 'error',
      confirmButtonText: 'Okay'
    })
    navigate('/login');

  }else{

    console.log("Success");
    setCookie('token', res.data.token, 30);
    dispatch({type: "USER", payload: true});
    Swal.fire({
      title: 'Congrats!!',
      text: 'Successfully Login',
      icon: 'success',
      confirmButtonText: 'Okay'
    })
    navigate('/');

  }

  } catch (error) {
    console.log(error)
  }

  }
  return (
    <>
    <section className="vh-100" style={{backgroundColor: "#CCFFFF"}}>
    <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: "1rem"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="Box ground login photo.jpeg"
                alt="login form" className="img-fluid" style={{bordeRadius: "1rem 0 0 1rem"}} />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form className="form">

                  <div className="d-flex align-items-center mb-3 pb-1">
                  <i className="fa-solid fa-volleyball fa-bounce fa-2xl" style= {{color: "#02baf7", height : "100"}}></i><img
          src="Logo Box.png"
          height="100"
          alt="MDB Logo"
          loading="lazy"
        />
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign into your account</h5>

                  <div className="form">
                  <label className="form-label">
                    <input type="email" className="form-control" style={{
                          width: "300px",
                          backgroundImage: "linear-gradient(#000, #000)",
                          backgroundPosition: "bottom 5px center",
                          backgroundSize: "calc(100% - 10px) 2px",
                          backgroundRepeat: "no-repeat",
                          backgroundColor: "#fcfcfc",
                          padding: "10px",
                          marginBottom : "10px",
                          borderStyle:"hidden"
                    }}  
                    name='email'
                    value={user.email}
                    onChange={handleInputs}
                    placeholder='Input Email'/>
                  </label>
                  </div>

                  <div className="form">
                  <label className="form-label">
                    <input type="Password" className="form-control" style={{
                          width: "300px",
                          backgroundImage: "linear-gradient(#000, #000)",
                          backgroundPosition: "bottom 5px center",
                          backgroundSize: "calc(100% - 10px) 2px",
                          backgroundRepeat: "no-repeat",
                          backgroundColor: "#fcfcfc",
                          padding: "10px",
                          marginBottom : "30px",
                          borderStyle:"hidden"
                    }}  
                    name='password'
                    value={user.password}
                    onChange={handleInputs}
                    placeholder='Input Password'/>
                  </label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="button" onClick={loginUser}>Login</button>
                  </div>

                  {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                  <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <NavLink to="/register"
                      style={{color: "#393f81"}}>Register here</NavLink></p>
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

export default Login
