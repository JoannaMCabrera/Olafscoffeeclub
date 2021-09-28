import React, {useState, useEffect} from 'react';

import {Container} from 'react-bootstrap';

import Product from "./Product";

export default function UserView({productsData}){

	// console.log(productsData)

	const [products,setProducts] = useState([])


	useEffect( ()=> {

		const productsArr = productsData.map ( (product) => {
			console.log(product)

			if (product.isActive === true){
				console.log(product);
				return <Product key={product._id} productProp={product} />
			} else {
				return null
			}
		})

		setProducts(productsArr)
	}, [productsData])

	return(
		<Container>
			{/*display the products*/}
			{products}
		</Container>
	)
}