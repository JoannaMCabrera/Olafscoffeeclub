import React from 'react'
import './../cssFiles/Product.css'
// import product__image from './../images/beanBag.jpg';
import PropTypes from 'prop-types';

export default function Product({productProp}) {
    const {productName, description, Price } = productProp
    console.log(productProp)
    return (
        
        <div className="product">
            <h3>{productName}</h3>
            <div className="product__info">
                <p>{description}</p>
                <p className="product__price">
                    <small>Php</small>
                    <strong> {Price}</strong>
                </p>
    {/*  <img className="product__image" src ={product__image} alt="beanBag" />

            <button>Add to basket</button>*/}      
            
            </div>
        </div>
      
         
    )
}

Product.propTypes = {
	productProp: PropTypes.shape({
		productName: PropTypes.string,
		description: PropTypes.string,
		Price: PropTypes.number
	})
}


