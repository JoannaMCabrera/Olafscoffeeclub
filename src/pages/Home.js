import React from 'react';
import './../cssFiles/Home.css';
import { Container } from 'react-bootstrap';
import Product from '../components/Product';
import home__image from './../images/coffeeBeans.png';


function Home() {
    return (
        <Container fluid>
            <div className="row">
                <div className= "col-12">
            <div className="home">
                <div className="home__container">
                    
                    <img className="home__image" src ={home__image} alt="homeImage" />

                    <div className="home__row d-flex flex-wrap">
                    
                        <Product title="First coffee bean"
                        price="{449.00}"
                        />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                       

                    </div>
                    
                    {/* <div className="home__row">
                    <div className= "col-12">
                        <Product />
                        <Product />
                        <Product />
                        </div>
                                        
                    </div>

                    <div className="home__row">
                        <Product />                    
                    </div> */}
                    </div>
                    </div>
                </div> 
            </div>
    </Container>
    );
}

export default Home;
