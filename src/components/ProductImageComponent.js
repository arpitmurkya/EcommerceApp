import React, { Component } from 'react';
import { SyncLoader } from 'react-spinners';
import { Carousel } from 'react-responsive-carousel'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from './../resources/css/applicationStyles';

class ProductImage extends Component {

    render() {
        
        if(this.props.data){
            
            var list = this.props.data.map( (image,index) => {
                return (
                <div key={index}>
                    <img src={image} alt="" style={style.carouselImageStyle} />
                    {/* <p className="legend">{ image.name }</p> */}
                </div>
                );
            });
            // return <img src={this.props.data[0]} alt="" />
            // return <Carousel showArrows={true} centerMode={true} style={style.carouselStyle}>
            return <Carousel 
                    showArrows={true} 
                    autoPlay={true} 
                    useKeyboardArrows={true}
                    dynamicHeight={true}
                    emulateTouch={true}
                    showStatus={false}
                    showThumbs={false}>
                    {list}
            </Carousel>
        } else {
            return (
                <div className="container p-4"> 
                    <SyncLoader
                    sizeUnit={"px"}
                    size={20}
                    color={'#212529'}
                    />
                </div>
            );
        }
    }

}

export default ProductImage;
