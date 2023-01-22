import React from "react";
import {Navigate} from 'react-router-dom';
import * as userUtil from '../util/userUtil';

const PrivateRoute=({children})=>{
    let auth = userUtil.isAuthenticated();
    return auth ? children : <Navigate to={'/users/login'}/>
};

export default PrivateRoute;