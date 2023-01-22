import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as userActions from '../../redux/user/user.action';




let UserLogin = ()=>{

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [user , setUser] = useState({
      email :"",
      password:""
  });

  let [userError , setUserError] = useState({
    emailError :"",
    passwordError:""
});



let validateEmail=(event)=>{
  setUser({...user, email : event.target.value});
  let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  !regExp.test(event.target.value) ? 
  setUserError({...userError , emailError : "Enter proper Email"}) : 
  setUserError({...userError , emailError : ''})
};


let validatePassword = (event) => {
  setUser({...user , password : event.target.value});
  let regExp = /^[A-Za-z]\w{7,14}$/;
  !regExp.test(event.target.value) ?
      setUserError({...userError , passwordError: 'Enter a proper Password'})
      : setUserError({...userError , passwordError: ''});
};

let submitUserLogin=(event)=>{
  event.preventDefault();
  dispatch(userActions.loginUser(user , navigate));
}
  return (
    <React.Fragment>

      {/* Heading section */}
       <section className="p-3 bg-brown text-dark">
         <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 "><i className="fa fa-sign-in-alt"/> Login a User</p>
            </div>
          </div>
         </div>
       </section>

       <section className="p-3 ">
        <div className="container">
          <div className="row">
            <div className="col-md-4 m-auto">
              <div className="card">
                <div className="card-header bg-dark text-brown">
                  <h3>Login</h3>
                </div>
                <div className="card-body bg-light">
                    <form onSubmit={submitUserLogin}>
                    <div className="form-group">
                      <input 
                      name="email"
                      value={user.email}
                      onChange={validateEmail}
                      required
                      type="email" className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`} placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <input 
                      name="password"
                      value={user.password}
                      onChange={validatePassword}
                      required
                      type="password" className={`form-control ${userError.passwordError.length > 0 ? 'is-invalid' : ''}`}placeholder="Password" />
                    </div>
                    <div >
                      <input type="submit" className="btn btn-dark text-brown btn-sm " value="submit" />
                    </div>
                  </form>
                  <small>Hava not a Account yet?
                      <Link to="/users/register" className="font-weight-bold">{' '} Register</Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
       </section>
    </React.Fragment>
  )
}
export default UserLogin;
