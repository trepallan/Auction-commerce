import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import React, { useState, useEffect} from 'react';
export function Navigation() {
   const [isAuth, setIsAuth] = useState(false);
   const [username, setUsername] = useState(null);
   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setUsername(localStorage.getItem('username'));
        setIsAuth(true); 
      }
    }, [isAuth, username]);
     return ( 
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container fluid>
          <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/"> Welcome {username}</Navbar.Brand>
          <Nav className="me-auto">
          {isAuth ? <Nav.Link href="/">Home</Nav.Link>: null}
          </Nav>

         <Nav>
         <NavDropdown title="Auctions" id="collasible-nav-dropdown" menuVariant='dark'>
            {isAuth && (
              <>
                <NavDropdown.Item href="/makeauction">Post Auction</NavDropdown.Item>
                <NavDropdown.Item href="/myauctions">My Auctions</NavDropdown.Item>
                <NavDropdown.Item href="/mybids">My Bids</NavDropdown.Item>
                <NavDropdown.Item href="/watchlist">Watch List</NavDropdown.Item>
              </>
            )}
        </NavDropdown>
         </Nav>
        </Navbar>
       </div>  
        </Container>
        <Nav>
          {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link> :  
                    <Nav.Link href="/login">Login</Nav.Link>}
          </Nav>
      </Navbar>
     );
}

export default Navigation;