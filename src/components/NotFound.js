import React from 'react';
import { Link } from 'react-router-dom';

import {
	Container,
	Row,
	Col
} from 'react-bootstrap';


export default function NotFound(){
	return(

    <Container>
    	<Row>
			<Col className="m-5">
				<h2>404 - Not Found</h2>
			    <p>The Page you are looking for cannot be found</p>
			    <p>Click here to go <Link to= "/"> Back Home
			    </Link></p>
			</Col>
		</Row>	 
	</Container>

	)
}
