"use strict"

import React from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';

class Footer extends React.Component{
  render(){
    return(
      <footer className="footer text-center">
        <div className="container">
          <p className="footer-text">Copyright 2017 OBA BookShop, All rights reserved</p>
        </div>
      </footer>
    );
  }
}

export default Footer
