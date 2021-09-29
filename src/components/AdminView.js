import React, {Fragment, useState, useEffect} from 'react'

import {Container, Table, Button, Modal, Form} from 'react-bootstrap'

import Swal from 'sweetalert2';



export default function AdminView(props){
	// console.log(props)

	const { productsData, allProductsData } = props;
	console.log(productsData) 

	const [productId, setProductId] = useState('');
	const [products, setProducts] = useState([]);
	const [productName, setName] = useState('');
	const [description, setDescription] = useState('');
	const [Price, setPrice] = useState(0);

	const [showEdit, setShowEdit] = useState(false);
	const [showAdd, setShowAdd] = useState(false);

	let token = localStorage.getItem('token');

	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);

	const openEdit = (productId) => {
		fetch(`https://shrouded-brook-21767.herokuapp.com/api/products/${productId}/update`,{
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			setProductId(result._id);
			setName(result.productName);
			setDescription(result.description);
			setPrice(result.Price)
		})

		setShowEdit(true);
	}

	const closeEdit = () => {

		setShowEdit(false);
		setName("")
		setDescription("")
		setPrice(0)
	}

	useEffect( () => {
		const productsArr = productsData.map( (product) => {
			console.log(product)
			return(
				<tr key={product._id}>
					<td>{product.productName}</td>
					<td>{product.description}</td>
					<td>{product.Price}</td>
					<td>
						{
							(product.isActive === true) ?
								<span>Available</span>
							:
								<span>Unavailable</span>
						}
					</td>
					<td>
						<>
							<Button variant="outline-secondary" size="sm" 
							onClick={ ()=> openEdit(product._id) }>
								Update
							</Button>
							<Button variant="outline-dark" size="sm"
							onClick={ () => deleteToggle(product._id)}>
								Delete
							</Button>
						</>
						{
							(product.isActive === true) ?
								<Button variant="outline-secondary" size="sm"
								onClick={()=> archiveToggle(product._id, product.isActive)}>
									Disable
								</Button>
							:
								
								<Button variant="outline-secondary" size="sm"
								onClick={ () => unarchiveToggle(product._id, product.isActive)}>
									Enable
								</Button>
								
						}
					</td>
				</tr>
			)
		})

		setProducts(productsArr)
	}, [productsData])

	/*edit product function*/
	const editProduct = (e, productId) => {

		e.preventDefault()

		fetch(`https://shrouded-brook-21767.herokuapp.com/api/products/${productId}/update`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				productName: productName,
				description: description,
				Price: Price
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result) 
			allProductsData()

			if(typeof result !== "undefined"){
				// alert("success")

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully updated!"
				})

				closeEdit();
			} else {

				allProductsData()

				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Something went wrong!"
				})
			}
		})
	}

	const archiveToggle = (productId, isActive) => {

		fetch(`https://shrouded-brook-21767.herokuapp.com/api/products/${productId}/archive`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			allProductsData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					"text": "Product successfully archived/unarchived"
				})
			} else {
				allProductsData();
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					"text": "Please try again"
				})
			}
		})
	}
	const unarchiveToggle = (productId, isActive) => {
		fetch(`https://shrouded-brook-21767.herokuapp.com/api/products/${productId}/unarchive`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			allProductsData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					"text": "Product successfully archived/unarchived"
				})
			} else {
				allProductsData();
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					"text": "Please try again"
				})
			}
		})
	}

	const deleteToggle = (productId) => {
		fetch(`https://shrouded-brook-21767.herokuapp.com/api/products/${productId}/delete`, {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			allProductsData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					"text": "Product successfully deleted"
				})
			} else {
				allProductsData();
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					"text": "Please try again"
				})
			}
		})
	}


	const addProduct = (e) => {
		e.preventDefault()

		fetch(`https://shrouded-brook-21767.herokuapp.com/api/products/createProduct`,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				productName: productName,
				description: description,
				Price: Price
			})
		})
		.then(result => result.json())
		.then (result =>{
			console.log(result)
			if (result === true){
				allProductsData()

				Swal.fire({
					title: "Success",
					icon: "success",
					"text": "Product successfully added"
				})
				setName("")
				setDescription("")
				setPrice(0)


				closeAdd();

			} else {
				allProductsData();

				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Something went wrong"
				})

			}
		})
	}

	return(
		<Container>
			<div>
				<h2 className="text-center">Admin Dashboard</h2>
				<div className="d-flex justify-content-end mb-2">
					<Button variant="outline-secondary" onClick={openAdd}>Add New Product</Button>
				</div>
			</div>
			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{products}
				</tbody>
			</Table>
		{/*Edit Product Modal*/}
			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={ (e) => editProduct(e, productId) }>
					<Modal.Header>
						<Modal.Title>Edit Product</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="productName">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								value={productName}
								onChange={ (e)=> setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="productDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								value={description}
								onChange={ (e)=> setDescription(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="productPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								value={Price}
								onChange={ (e)=> setPrice(e.target.value)}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		{/*Add product Modal*/}
		<Modal show={showAdd} onHide={closeAdd}>
			<Form onSubmit={ (e) => addProduct (e)}>
				<Modal.Header>Add Product</Modal.Header>
				<Modal.Body>
					<Form.Group productId="productName">
						<Form.Label>Name</Form.Label>
						<Form.Control 
							type="text"
							value={productName}
							onChange={(e)=> setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group productId="productDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="text"
							value={description}
							onChange={(e)=> setDescription(e.target.value)}
						/>
					</Form.Group>
					<Form.Group productId="productPrice">
						<Form.Label>Price</Form.Label>
						<Form.Control 
							type="number"
							value={Price}
							onChange={(e)=> setPrice(e.target.value)}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={closeAdd}>Close</Button>
					<Button variant="outline-secondary" type="submit">Submit</Button>
				</Modal.Footer>
			</Form>
		</Modal>
		</Container>
	)
}