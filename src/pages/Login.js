import React, {useState, useEffect, useContext}  from 'react';
import {Redirect} from 'react-router-dom';


/*Context*/
import UserContext from '../UserContext';

/*react-bootstrap components*/
import {Container, Form, Button} from 'react-bootstrap';

export default function Login(){

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	/*destructure context object*/
	const {user, setUser} = useContext(UserContext);

	useEffect( () => {
		if(email !== '' && password !== ''){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [email, password]);

	function login(e) {
		e.preventDefault();


			fetch("https://shrouded-brook-21767.herokuapp.com/api/users/login",{
				method:"POST",
				headers:{
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email:email,
					password:password
				})
			})
			.then( result => result.json())
			.then( result => {
				console.log(result) // token

				if(typeof result.access !== "undefined"){
					localStorage.setItem('token', result.access)
					userDetails(result.access)
				}
			})

			const userDetails = (token) => {
				fetch('https://shrouded-brook-21767.herokuapp.com/api/users/details',{
					method:"GET",
					headers:{
						"Authorization": `Bearer ${token}`
						}
					})
					.then( result => result.json())
					.then( result => {
						 console.log(result)

						 setUser({
						 	id:result._id,
						 	isAdmin: result.isAdmin
						 });
				})
			}


		setEmail('');
		setPassword('');
	}
	
	return(
		(user.id !== null)?
		 	<Redirect to="/" />
		:
			<Container className="mb-5">
				<h1 className="text-center">Login</h1>
				<Form onSubmit={ (e)=> login (e) }>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" value={email}
						onChange={(e)=> setEmail(e.target.value) }/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" value={password}
						onChange={(e)=> setPassword(e.target.value)}/>
					</Form.Group>

			<Button variant="primary" type="submit" disabled={isDisabled}>Submit</Button>
				</Form>
			</Container>
		)
	}