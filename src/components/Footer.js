import React, { Component } from 'react';

// CSS
import './../resources/css/bootstrap.css';
import style from './../resources/css/applicationStyles';

class Footer extends Component {
    render() {
        return (
            <div style={style.footerStyle}>
                <footer className="page-footer font-small bg-dark h-10">
                    <div className="text-center text-white py-3">
                        <ul className="ml-auto">
                            <li className="nav-item nav-link menu-item d-inline">
                                About
                            </li>
                            <span style={style.verticalLineStyle}></span>
                            <li className="nav-item nav-link menu-item d-inline">
                                Contact
                            </li>
                            <span style={style.verticalLineStyle}></span>
                            <li className="nav-item nav-link menu-item d-inline">
                                Privacy Policy
                            </li>
                            <span style={style.verticalLineStyle}></span>
                            <li className="nav-item nav-link menu-item d-inline">
                                Return Policy
                            </li>
                        </ul>
                    </div>
            </footer>
        </div>
        )}
}
    
export default Footer;
