
export const isAuthenticated=()=>{
  return localStorage.getItem('shoping-token') ? true : false;
};

export const getToken =()=>{
  return localStorage.getItem('shoping-token');
};