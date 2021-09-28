import React, {useState, useEffect, useContext} from 'react';

/*react-bootstrap component*/
import {Container} from 'react-bootstrap'

/*components*/
// import Course from './../components/Course';
import AdminView from './../components/AdminView.js';
import UserView from './../components/UserView.js';

/*context*/
import UserContext from './../UserContext';

export default function Products(){

	const [products, setProducts] = useState([]);
	const [allProducts, setAllProducts] = useState([]);

	const {user} = useContext(UserContext);

	const fetchData = () => {
		
		fetch('https://shrouded-brook-21767.herokuapp.com/api/products/products',{
				

			method: "GET"
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)
			setProducts(result)
		})
	}

	const allProductsData = () => {
		let token = localStorage.getItem('token')

		fetch(`https://shrouded-brook-21767.herokuapp.com/api/products/getAll`,{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)
			setAllProducts(result)
		})
	}

	useEffect( () => {
		console.log(user.isAdmin)
		if(user.isAdmin !== true) {
			fetchData()
			
		} else {
			allProductsData()
			
		}
	}, [user.isAdmin])

 
	return(
		<Container className="p-4">
			{ (user.isAdmin === true) ?
				
					<AdminView productsData={allProducts} allProductsData={allProductsData} />
				:
					<UserView productsData={products} />

			}
		
						
		</Container>
	)
}