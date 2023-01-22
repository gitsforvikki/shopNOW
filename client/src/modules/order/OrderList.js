import React, {useEffect} from 'react';
import * as orderActions from '../../redux/order/order.action';
import * as orderReducer from '../../redux/order/order.reducer';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../util/spinner/Spinner";

let OrderList = () => {
    let dispatch = useDispatch();

    // get Orders Info from Redux Store
    let orderInfo = useSelector((state) => {
        return state[orderReducer.orderFeaturesKey];
    });

    let {allOrders , loading} = orderInfo;

    useEffect(() => {
        dispatch(orderActions.getAllOrders());
    }, []);

    return (
        <React.Fragment>
            <section className="p-3 bg-brown">
                <div className="container ">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <i className="fa fa-list"/> Orders List</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            allOrders.length > 0 ? <React.Fragment>
                                    <div className="container-fluid mt-3">
                                        <div className="row">
                                            <div className="col">
                                                <table className="table table-hover table-striped bg-brains text-center">
                                                    <thead className="bg-dark text-white">
                                                    <tr>
                                                        <th>Order ID</th>
                                                        <th>NAME</th>
                                                        <th>EMAIL</th>
                                                        <th>MOBILE</th>
                                                        <th>ITEMS</th>
                                                        <th>TOTAL</th>
                                                        <th>DATE</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        allOrders.length > 0 ? <React.Fragment>
                                                            {
                                                                allOrders.map(order => {
                                                                    return (
                                                                        <tr key={order._id}>
                                                                            <td>{order._id.substr(order._id.length - 5)}</td>
                                                                            <td>{order.name}</td>
                                                                            <td>{order.email}</td>
                                                                            <td>{order.mobile}</td>
                                                                            <td>
                                                                                <ul className="list-group">
                                                                                    {
                                                                                        order.items.map(item => {
                                                                                            return (
                                                                                                <React.Fragment>
                                                                                                    <li className="list-group-item">
                                                                                                        NAME : {item.name} {" "}
                                                                                                        Qty : {item.qty} {" "}
                                                                                                        Price : {item.price} {" "}
                                                                                                    </li>
                                                                                                </React.Fragment>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </ul>
                                                                            </td>
                                                                            <td><span>Rs </span>{(Number(order.total) + Number(order.tax)).toFixed(2)}</td>
                                                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </React.Fragment> : null
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment> :
                                <React.Fragment>
                                   <section className='p-2'>
                                    <div className='container'>
                                      <div className='row text-center'>
                                        <div className='col '>
                                        <p className="h3">------------ No Orders Found ----------</p>
                                        </div>
                                      </div>
                                    </div>
                                   </section>
                                </React.Fragment>
                        }
                    </React.Fragment>
            }
        </React.Fragment>
    )
};
export default OrderList;