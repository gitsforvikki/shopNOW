import React from 'react';

let  Home = ()=>{
  return(
      <React.Fragment>
          <section>
              <div className="landing-page">
                  <div className="wrapper">
                      <div className="d-flex flex-column justify-content-center align-items-center text-center h-100 ">
                          <h4 className="display-4">Welcome to Online Shopping</h4>
                          <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium cupiditate dicta, dolores iusto nesciunt quidem sunt vero! Adipisci aperiam atque autem commodi consequatur doloremque doloribus eaque facilis, fuga molestiae, odit rem repudiandae vel. Earum libero maxime nesciunt nihil, sapiente sequi.</p>
                          <button className="btn btn-brown text-dark  btn-sm">Shop Now</button>
                      </div>
                  </div>
              </div>
          </section>
      </React.Fragment>
  )
};
export  default Home;