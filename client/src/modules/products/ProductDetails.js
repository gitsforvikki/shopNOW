import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import * as productActions from '../../redux/products/product.action';
import * as productReducer from '../../redux/products/product.reducer';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../util/spinner/Spinner";
import * as orderActions from '../../redux/order/order.action';

let ProductDetails = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [selectedQty , setSelectedQty] = useState('');

    let productId = useParams().productId;

    let selectedProductInfo = useSelector((state) => {
        return state[productReducer.productFeaturesKey];
    });

    let {loading , selectedProducts} = selectedProductInfo;

    useEffect(() => {
        dispatch(productActions.getSingleProducts(productId))
    }, [productId]);

    let submitAddToCart = (event) => {
        event.preventDefault();
        selectedProducts.qty = (selectedQty !== '') ? Number(selectedQty) : 1;
        dispatch(orderActions.addToCart(selectedProducts, navigate));
    }

    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>Your Selected Product</h3>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        <section className="mt-4">
                            <div className="container">
                                <div className="row">
                                    {
                                        Object.keys(selectedProducts).length > 0 &&
                                        <React.Fragment>
                                            <div className="col-md-4 text-center">
                                                <img src={selectedProducts.image} alt="" className="img-fluid product-img"/>
                                            </div>
                                            <div className="col-md-8">
                                                <p className="h3">NAME : {selectedProducts.name}</p>
                                                <p className="h5">Brand : {selectedProducts.brand}</p>
                                                <p className="h5">Price :
                                                    <span className="font-weight-bold"><span>Rs{' '}</span>{selectedProducts.price.toFixed(2)}</span>
                                                </p>
                                                <div>
                                                    <form className="form-inline" onSubmit={submitAddToCart}>
                                                        <div className="form-group">
                                                            <select
                                                                value={selectedQty}
                                                                onChange={e => setSelectedQty(e.target.value)}
                                                                className="form-control">
                                                                <option value="">Select a Qty</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <input type="submit" className="btn btn-brown btn-sm text-dark" value="Add to Cart"/>
                                                        </div>
                                                    </form>
                                                </div>
                                                <p>{selectedProducts.usage}</p>
                                                <p>{selectedProducts.description}</p>
                                            </div>
                                        </React.Fragment>
                                    }
                                </div>
                            </div>
                        </section>
                    </React.Fragment>
            }
        </React.Fragment>
    )
};
export default ProductDetails;