import React, {useState, useEffect} from 'react';
import './../cssFiles/Home.css';
import { Container, Card, Button } from 'react-bootstrap';
import Product from '../components/Product';
import Blogs from '../components/Blogs';
import home__image from './../images/coffeeBeans.png';


function Home() {
    const [products, setProducts] = useState([]);
    const fetchData = () => {
		
		fetch('https://shrouded-brook-21767.herokuapp.com/api/products/products',{
				
			method: "GET"
		})
		.then(result => result.json())
		.then(result => {
            // let productsArr = result.map((product)=> {

			// 	return product;

			// });
			console.log("result:",result)
            // console.log("products:",productsArr)
			setProducts(result)
            
            
		})
	}
    useEffect( ()=> {
        fetchData();
    },[]);

    let mappedProducts = products.map((element)=>{
        return (
            <Product productProp={element}/>
        )
    })
    return (
        <Container fluid>
            <div className="row">
                <div className= "col-12">
            <div className="home">
                <div className="home__container">
                    
                    <img className="home__image" src ={home__image} alt="homeImage" />
                   

                    <div className="home__row d-flex flex-wrap">
                        {mappedProducts}
                    
                    
                    </div>
                    </div>
                    </div>
                </div> 
                <Blogs />
            </div>
        </Container>
    );
}

export default Home;
