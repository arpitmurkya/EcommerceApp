import React, { Component } from 'react';

// CSS
import style from './../resources/css/applicationStyles';

class ProductListing extends Component {

    render() {
        // Redirecting URL
        let url = "/products/"+this.props.data._id;

        return (
            <div className="h-25 w-25 p-2 d-inline-block" style={style.productImageDivStyle}>
                <div>
                    <a href={url} >
                        <img style={style.productImgStyle} 
                            src={this.props.data.images[0]} alt="" />
                    </a>
                </div>
                <div className="container">
                    <small>{this.props.data.name}</small>
                </div>
                <div>
                    <i className="fas fa-rupee-sign fa-xs"></i>
                    <small>{this.props.data.mark_price}</small>
                </div>
            </div>
        );
      }
    }
    
    export default ProductListing;
