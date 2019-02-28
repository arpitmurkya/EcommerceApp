import React, { Component } from 'react';
import { BounceLoader } from 'react-spinners';

// CSS
import './../resources/css/bootstrap.css';
import style from './../resources/css/applicationStyles';

// Components
import ProductDialog from './ProductDialogComponent';

class ProductListing extends Component {

    constructor(props){
        super(props);

        this.state = {
            pageIndex:1
        }
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount(){
        this.props.getProductsList(this.state.pageIndex);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.pageIndex !== prevState.pageIndex){
            this.props.getProductsList(this.state.pageIndex);
        }
    }

    // Length of Object
    getLength(product) {
        return Object.keys(product).length;
    }

    // To handle Scroll event
    handleScroll() {
        var heightBound = window.outerHeight * 0.2;        
        if (window.scrollY > heightBound) {
            this.setState({pageIndex:this.state.pageIndex+1});
        }
    }

    // To handle Load more button click
    handleOnClick(){
        this.setState({pageIndex:this.state.pageIndex+1});
    }

    render() {
        
        var productDialogs = this.props.productList.map((index) => {
            return <ProductDialog key={index._id} data={index} onScroll={this.handleScroll}/>;
        });
        if(this.props && this.getLength(this.props.productList)){
            return (
                <div className="container pt-4">
                    <div>
                    {productDialogs}
                    </div>

                    {/* Loading products on 'Load More' button click */}
                    {/* <button type="button" className=" btn btn-outline-dark mb-4" 
                        onClick={this.handleOnClick}>
                        Load More
                    </button> */}
                </div> 
            );
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
            )
        }
      }
    }
    
    export default ProductListing;