import React,{Fragment, useContext} from 'react';
import {Link, NavLink, useHistory } from 'react-router-dom';
import './../cssFiles/Header.css';
import {Navbar, Nav } from 'react-bootstrap';
import logo from './../images/olaf.png';
import searchIcon from './../images/searchIcon.png';
import ShoppingCartIcon from './../images/shopping-cart.png';

/*context*/
import UserContext from '../UserContext';


function Header() {
    const {user, unsetUser} = useContext(UserContext);
    let history = useHistory();
    const logout = () => {
      unsetUser();
      history.push('/login');
    }
  
    let addNav = (user.id === null) ? 
      (
        <Fragment>
          <Nav.Link as={NavLink} to="/register" className="navbar__leftNav" >Register</Nav.Link>
         
        </Fragment>
      ) 
      : 
      (
        <Fragment>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Fragment>
      )
  
    return (
      
      // <div className="row w-100">
      //     <div className="col-12 p-0">
        <Navbar className="navbar d-flex" bg="dark" variant="dark" expand="lg">
          <img className="navbar__logo" src ={logo} alt="logo" />
          <Navbar.Brand as={Link} to="/" className="navbar__brand">
            Olaf's Coffee Club
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
              <input className="navbar__searchInput" type="text"/>
              <img className="navbar__searchIcon" src ={searchIcon} alt="search" />
              <Nav className="navbar__nav me-auto">

                <Nav.Link  as={NavLink} to="/login" className="navbar__option" > 
                  <span className='navbar__optionLineOne'>Hello </span>
                  <span className='navbar__optionLineTwo'>Sign In </span>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/products" className="navbar__option">
                  <span className='navbar__optionLineOne'>Products </span>
                  <span className='navbar__optionLineTwo'>Blogs </span>              
                </Nav.Link>
                <Nav.Link  as={NavLink} to="/" className="navbar__option">
                  <span className='navbar__optionLineOne'>Exclusive </span>
                  <span className='navbar__optionLineTwo'>Membership </span>                 
                </Nav.Link>
               
                {addNav}
             
                <Nav.Link as={NavLink} to="/checkout" className="navbar__option">
                  <img className="navbar__optionCart cartlogo" src ={ShoppingCartIcon} alt="search" />
                  {/* <span className="navbar__optionLineTwo navbar__Cartcount">0</span>                     */}
                </Nav.Link>
              </Nav>
          
                
            </Navbar.Collapse>
        </Navbar>
        // </div>
        // </div>
    )
}
    
export default Header
