import React from "react";
import spinner  from '../../assets/img/spinner.gif';

let Spinner =()=>{
  return(
    <React.Fragment>
        <section>
          <div className="container">
            <div className="row">
              <div className="col">
              <div className="m-auto text-center">
                 <img src={spinner} alt="" />
              </div>
              </div>
            </div>
          </div>
        </section>
    </React.Fragment>
  )
}

export default Spinner;