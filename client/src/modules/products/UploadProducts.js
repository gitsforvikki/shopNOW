import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as productActions from '../../redux/products/product.action';
import * as userReducer from '../../redux/user/user.reducer';
import Spinner from '../../util/spinner/Spinner';

let UploadProducts=()=>{

  let dispatch = useDispatch();
  

  let [product , setProduct] = useState({
    name : '',
    brand : '',
    price : '',
    qty : '',
    image : '',
    category : '',
    description : '',
    usage : ''
});



let userInfo = useSelector((state)=>{
  return state[userReducer.userFeaturesKey];
});

let {user , loading} = userInfo;

let updateInput=(event)=>{
  setProduct({
    ...product,
    [event.target.name] :event.target.value
  })
};

let convertBase64String = (imageFile) => {
  return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.addEventListener('load', () => {
          if(fileReader.result){
              resolve(fileReader.result);
          }
          else {
              reject('Error Occurred');
          }
      })
  });
};

let updateImage= async (event)=>{
      let imageFile = event.target.files[0];
      let base64Image = await convertBase64String(imageFile);
      setProduct({
        ...product,
        image : base64Image
      })
};

let submitUploadProduct =(event)=>{
  event.preventDefault();
  dispatch(productActions.uploadProducts(product ));
  setProduct({
    name : '',
    brand : '',
    price : '',
    qty : '',
    image : '',
    category : '',
    description : '',
    usage : ''
  });
}
  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(user)}</pre> */}
        <section className="p-3 bg-brown text-dark">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h3">
                  <i className="fa fa-upload" />Upload Products</p>
              </div>
            </div>
          </div>
        </section>

        <section className="p-2">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h3">Upload Products Here </p>
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda fuga ipsam, ipsum nihil repellat sequi tempora vero! Atque corporis doloremque eius fuga, fugiat iste molestiae molestias, odit officiis quas voluptatem.</p>
              </div>
            </div>
          </div>
        </section>
         
        {
          loading ? <Spinner/>  :
          <React.Fragment>
            {
          user?.isAdmin ? <React.Fragment>
            <section className="p-2">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
               <div className="card">
                <div className="card-body">
                 <form onSubmit={submitUploadProduct}>
                  <div className="form-group">
                   <input 
                   name="name"
                   value={product.name}
                   onChange={updateInput}
                   required
                   type="text"  className="form-control"  placeholder="Name" />
                  </div>
                  <div className="form-group">
                   <input 
                   name="brand"
                   value={product.brand}
                   onChange={updateInput}
                   required
                   type="text"  className="form-control"  placeholder="Brand" />
                  </div>
                  <div className="form-group">
                   <select 
                   
                   name="category"
                   value={product.category}
                   onChange={updateInput}
                   required

                   className="form-control">
                    <option>Select a category </option>
                    <option value="MEN">Men's wear </option>
                    <option value="WOMEN">Women's wear </option>
                    <option value="KIDS">Kids's wear  </option>
                   </select>
                  </div>

                  <div className="form-group">
                    <div className="custom-file">
                      <input
                          
                          onChange={updateImage}
                          type="file" className="custom-file-input" id="customFile" required/>
                          <label className="custom-file-label" htmlFor="customFile">
                          {
                                                            product.image.length > 0 ?
                                                                <img src={product.image} alt="" width="20" height="30"/> : 'Product Image'
                                                        }
                          </label>
                    </div>
                  </div>
                  
                  <div className="form-group">
                   <input
                   name="price"
                   value={product.price}
                   onChange={updateInput}
                   required

                   type="text"  className="form-control" alt="" placeholder="Price" />
                  </div>
                  <div className="form-group">
                   <input 
                   name="qty"
                   value={product.qty}
                   onChange={updateInput}
                   required

                   type="text"  className="form-control" alt="" placeholder="Quantity" />
                  </div>
                  <div className="form-group">
                    <textarea 
                    name="description"
                    value={product.description}
                    onChange={updateInput}
                    required
 
                    rows="3" className="form-control" placeholder="Description"></textarea>
                  </div>
                  <div className="form-group">
                    <textarea 
                    name="usage"
                    value={product.usage}
                    onChange={updateInput}
                    required
                    rows="3" className="form-control" placeholder="Usages"></textarea>
                  </div>
                  <div className="form-group">
                    <input type="submit" className="btn btn-dark" value="Submit" />
                  </div>
                 </form>
                </div>
               </div>
              </div>
            </div>
          </div>
        </section>
          </React.Fragment> : 
          
          <React.Fragment>
              <section className="p-2">
                <div className="container">
                  <div className="row">
                    <div className="col text-center text-danger">
                      <span >You have no access to upload the product,</span><br/>
                      <span>Please contact to DB Administrator to grant you access............!</span>
                    </div>
                  </div>
                </div>
              </section>
          </React.Fragment>
        }
          </React.Fragment>
        }
        <div style={{marginBottom : "150px"}}></div>
    </React.Fragment>
  )
}
export default UploadProducts;