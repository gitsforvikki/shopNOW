import React, { useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as productActions from '../../redux/products/product.action';
import * as productReducer from '../../redux/products/product.reducer';
import Spinner from '../../util/spinner/Spinner';
import * as orderActions from '../../redux/order/order.action';


let MensWear = ()=>{

  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(()=>{
    dispatch(productActions.getMensProducts());
  },[]);
  let productInfo = useSelector((state)=>{
    return  state[productReducer.productFeaturesKey];
  });

  let {loading ,products} = productInfo;

  let clickAddToCart=(product)=>{
        product.qty =1;
        dispatch(orderActions.addToCart(product , navigate))
  }

  return(
    <React.Fragment>
            <section className="bg-brown text-dark p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                       <h3><i className="fa fa-mens"/>Men's Wear</h3>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            products.length > 0 ?
                                <React.Fragment>
                                    <section>
                                        <div className="container mt-3">
                                            <div className="row">
                                                {
                                                    products.map(product => {
                                                        return (
                                                            <div className="col-md-3" key={product._id}>
                                                                <div className="card my-3">
                                                                    <div className="card-header bg-white text-center">
                                                                        <Link to={`/products/${product._id}`}>
                                                                            <img src={product.image} alt=""/>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="card-body text-center">
                                                                        <small className="lead font-weight-bold">{product.name}</small><br/>
                                                                        <small className="lead font-weight-bold">{product.brand}</small><br/>
                                                                        <small className="font-weight-bold"> <span> Rs. </span> <span>{" "}</span>{product.price.toFixed(2)}</small><br/>
                                                                        <button onClick={clickAddToCart.bind(this, product)} className="btn btn-brown text-dark btn-sm">Add to Cart</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </section>
                                </React.Fragment> : null
                        }
                    </React.Fragment>
            }

        </React.Fragment>
  )
}
export default MensWear;