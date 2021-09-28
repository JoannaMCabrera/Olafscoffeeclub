import React, {useState, useEffect, useContext} from 'react';
import { Redirect, useHistory } from 'react-router-dom';

/*Context*/
import UserContext from './../UserContext';

/*sweetalert*/
import Swal from 'sweetalert2';

/*react-bootstrap components*/
import {Container, Form, Button} from 'react-bootstrap';


export default function Register(){

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	let history = useHistory();

	/*destructure context object*/
	const {user, setUser, unsetUser} = useContext(UserContext);
	// console.log(user);

	useEffect( () => {
		if(email !== '' && password !== '' && verifyPassword !== '' && password === verifyPassword){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [email, password, verifyPassword]);

	function Register(e) {
		e.preventDefault();


		// alert('Registration Successful, you may now login');
		fetch("https://shrouded-brook-21767.herokuapp.com/api/users/checkEmail",{
			method:"POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email:email
			})
		})
		.then( result => result.json())
		.then( result => {
			console.log(result)

			if(result === true){
				Swal.fire({
					title: 'Duplicate email found',
					icon: 'error',
					text: 'Please choose another email'
				})
			} else  {
				fetch(`https://shrouded-brook-21767.herokuapp.com/api/users/register`,{
					method:"POST",
					headers:{
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						firstName:firstName,
						lastName: lastName,
						email:email,
						password: password
					})
					
				})
				.then( result => result.json())
				.then( result => {
					console.log(result);
					if(result !== null){

						Swal.fire({
							title: 'Registration Successful',
							icon: 'success',
							text: 'Welcome to Olafs Coffee Club!'
						})

						history.push('/login');
					}else {
						Swal.fire({
							title: 'Something went wrong',
							icon: 'error',
							text: 'Please try again'
						})
					}
				})
			}
		})

		
		setUser({email: email});
		
		localStorage.setItem('email', email)

		setEmail('');
		setPassword('');
		setVerifyPassword('');
		}
	
	return(
		(user.id !== null)?
		<Redirect to="/" />
		
		:

		<Container className="mb-5">
			<h1 className="text-center">Register</h1>
			<Form onSubmit={(e) => Register(e)}>
				<Form.Group className="mb-3" controlId="formfirstName">
					<Form.Label>First Name</Form.Label>
					<Form.Control type="text" placeholder="Enter First Name" value={firstName}
					onChange={(e)=> setFirstName(e.target.value) }/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formlastName">
					<Form.Label>Last Name</Form.Label>
					<Form.Control type="text" placeholder="Enter Last Name" value={lastName}
					onChange={(e)=> setLastName(e.target.value)}/>
				</Form.Group>

				{/* <Form.Group className="mb-3" controlId="formmobileNo">
					<Form.Label>Mobile Number</Form.Label>
					<Form.Control type="text" placeholder="Enter Mobile Number" value={mobileNo}
					onChange={(e)=> setMobileNo(e.target.value)}/>
				</Form.Group> */}

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

				<Form.Group className="mb-3" controlId="formVerifyPassword">
					<Form.Label>Verify Password</Form.Label>
					<Form.Control type="password" placeholder="Verify Password" value={verifyPassword} 
					onChange={(e)=> setVerifyPassword(e.target.value)}/>
				</Form.Group>

				<Button variant="primary" type="submit" disabled={isDisabled}>Submit</Button>
			</Form>
		</Container>
	)
}