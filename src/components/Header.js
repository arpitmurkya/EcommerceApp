import React, { Component } from 'react';

// CSS
import './../resources/css/bootstrap.css';
import style from './../resources/css/applicationStyles';

// Images
import image from './../images/logo-1.png';

class Header extends Component {
    render() {
        
        return (
          <nav className="navbar navbar-expand-lg navbar-light bg-light border">
            <div className="d-flex flex-grow-1">
                <a href="/" className="navbar-brand d-none d-lg-inline-block font-weight-bold">
                    <img src={image} style={style.logoImageStyle} alt="" />
                    <p style={style.logoTextStyle}> AppStreet </p>
                </a>
            </div>
            <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
                <ul className="navbar-nav ml-auto flex-nowrap">
                    <li className="nav-item m-2 menu-item nav-active font-weight-bold">
                        <a href="/" className="nav-item nav-link menu-item nav-active">
                            Home
                        </a>
                    </li>
                    <li className="nav-item m-2 menu-item nav-active font-weight-bold">
                        <a href="/" className="nav-item nav-link menu-item nav-active">
                            About
                        </a>
                    </li>
                    <li className="nav-item m-2 menu-item nav-active font-weight-bold">
                        <a href="/" className="nav-item nav-link menu-item nav-active">
                            Contact
                        </a>
                    </li>
                    <li className="nav-item m-2 menu-item nav-active font-weight-bold">
                        <a href="/" className="nav-item nav-link menu-item nav-active">
                            Bag
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        );
      }
    }
    
    export default Header;
    