import React,{useContext} from 'react'
import {useHistory} from 'react-router-dom'
import './../cssFiles/Product.css'
import product__image from './../images/beanBag.jpg';
// import PropTypes from 'prop-types';
import UserContext from '../UserContext';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router';

export default function Product(props) {
    const {user}= useContext(UserContext)
    const history = useHistory()
    const {productProp} = props;
    console.log(props.productProp)
    function loc() {
        if(user.id == null){
            history.push("/login")
        }else{
            history.push("/checkout")
        }
    }
    return (
        
        <div className="container my-5">
            <h3 className="text-center">{productProp.productName}</h3>
            <div className="row justify-content-center">            
                <div className="col-12 col-md-6">
                    <div className="product">
                        
                        <div className="product__info">
                            <p>{productProp.description}</p>
                            <p className="product__price">
                                <small>Php</small>
                                <strong> {productProp.Price}</strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <img className="product__image" src ={product__image} alt="beanBag" />                                             
                </div>
                   
            </div>
           
            <div className="text-center">
                <button className="btn btn-dark" onClick={loc}>Add to basket</button> 
            </div>
        </div>
      
         
    )
}

// Product.propTypes = {
// 	productProp: PropTypes.shape({
// 		productName: PropTypes.string,
// 		description: PropTypes.string,
// 		Price: PropTypes.number
// 	})
// }


