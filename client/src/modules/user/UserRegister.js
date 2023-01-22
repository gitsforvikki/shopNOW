import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useDispatch} from  'react-redux';
import *  as userActions from '../../redux/user/user.action';


let UserRegister = ()=>{

  let dispatch = useDispatch();

  let [user , setUser] = useState({
      name :"",
      email :"",
      password:"",
      confirmPassword:''
  });

  let [userError , setUserError] = useState({
    nameError :"",
    emailError :"",
    passwordError:"",
    confirmPasswordError:''
});

let validateUsername=(event)=>{
  setUser({...user, name : event.target.value});
  let regExp = /^[a-zA-Z0-9 ]{4,15}$/;
  !regExp.test(event.target.value) ? 
  setUserError({...userError , nameError : "Enter proper user name"}) : 
  setUserError({...userError , nameError : ''})
};

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

let validateConfirmPassword = (event) => {
  setUser({...user , confirmPassword : event.target.value});
  (user.password !== event.target.value) ?
      setUserError({...userError , confirmPasswordError: 'Passwords Not Matched'})
      : setUserError({...userError , confirmPasswordError: ''});
};


let clickSubmitUser=(event)=>{
  event.preventDefault();
  dispatch(userActions.registerUser(user));


}

  return (
    <React.Fragment>
      {/* Heading section */}
       <section className="p-3 bg-brown text-dark">
         <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3"><i className="fa fa-user-shield"/> Register a User</p>
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
                  <h3>Register</h3>
                </div>
                <div className="card-body bg-light">
                    <form onSubmit={clickSubmitUser}>
                    <div className="form-group">
                      <input 
                        name ="name"
                        value={user.name}
                        onChange={validateUsername}
                        required
                      type="text" className={`form-control ${userError.nameError.length > 0 ? 'is-invalid' : ''}`} placeholder="username" />
                    </div>
                    <div className="form-group">
                      <input 
                      name ="email"
                      value={user.email}
                      onChange={validateEmail}
                      required
                      type="email" className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`} placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <input
                        name ="password"
                        value={user.password}
                        onChange={validatePassword}
                        required
                      type="password" className={`form-control ${userError.passwordError.length > 0 ? 'is-invalid' : ''}`} placeholder="Password" />
                    </div>
                    <div className="form-group">
                      <input 
                      name ="confirmPassword"
                      value={user.confirmPassword}
                      onChange={validateConfirmPassword}
                      required
                      type="password" className={`form-control ${userError.confirmPasswordError.length > 0 ? 'is-invalid' : ''}`} placeholder="Confirm Password" />
                    </div>
                    <div >
                      <input type="submit" className="btn btn-dark text-brown btn-sm" value="submit" />
                    </div>
                  </form>
                  <small>Already have an account ?
                      <Link to="/users/login" className="font-weight-bold">{' '} Login here</Link>
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
export default UserRegister;
