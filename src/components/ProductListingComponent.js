import React, { Component } from 'react';
import { SyncLoader } from 'react-spinners';

// CSS
import './../resources/css/bootstrap.css';

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

    handleScroll(event) {
        var heightBound = window.outerHeight * 0.2;        
        if (window.scrollY > heightBound) {
            this.setState({pageIndex:this.state.pageIndex+1});
        }
    }

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
                <div className="container p-4 "> 
                    <SyncLoader
                    sizeUnit={"px"}
                    size={20}
                    color={'#212529'}
                    />
                </div>
            )
        }
      }
    }
    
    export default ProductListing;