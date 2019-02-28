import React, { Component } from 'react';
import { BounceLoader } from 'react-spinners';
import { Carousel } from 'react-responsive-carousel'

// CSS
import './../resources/css/bootstrap.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from './../resources/css/applicationStyles';

class ProductImage extends Component {

    render() {
        
        if(this.props.data){

            // list of product images
            var list = this.props.data.map( (image,index) => {
                return (
                <div key={index}>
                    <img className="d-block w-100" src={image} alt="" />
                  </div>
                );
            });
            
            return <Carousel 
                    showArrows={true} 
                    autoPlay={true} 
                    useKeyboardArrows={true}
                    dynamicHeight={true}
                    emulateTouch={true}
                    showStatus={false}>
                    {list}
            </Carousel>
        } else {
            return (
                <div className="container" style={style.loaderOuterDivStyle}>
                    <div className="center" style={style.loaderInnerDivStyle}>
                        <BounceLoader
                        sizeUnit={"px"}
                        size={50}
                        color={'#212529'}
                        />
                    </div>
                </div>
            );
        }
    }

}

export default ProductImage;
