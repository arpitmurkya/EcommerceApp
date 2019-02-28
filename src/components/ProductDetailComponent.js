import React, { Component } from 'react';
import { BounceLoader } from 'react-spinners';

// CSS
import style from './../resources/css/applicationStyles';

// Components
import ProductImageComponent from './ProductImageComponent';

class ProductDetail extends Component {

    constructor(props){
        super(props);

        this.state = {
            productId:"",
            product:{},
            attributes:[],
            options:[],
            productVariations:[],
            selectedOptions:[],
            attributeToSelectedMap:{}
        }
        this.getProductAttributes = this.getProductAttributes.bind(this);
        this.generateProductValues = this.generateProductValues.bind(this);
    }
    
    // Inital call for Fetching Product details
    componentDidMount = () => {
        this.props.getProductDetails(this.props.params.productId,
            this.setProductDetailsUsingResponse);
    }

    // Subsequent calls
    // componentDidUpdate = (prevProps) => {
    //     if (prevProps.params.productId !== this.props.params.productId) {
    //         this.props.getProductDetails(this.state.productId,
    //             this.setProductDetailsUsingResponse);
    //     }
    // }



    // ====================================================
    // Fetch response and set component state
    // ====================================================
    setProductDetailsUsingResponse = (responseReceived) => {
        var selectedOpt = responseReceived.selected_option_ids;
        
        var filteredElements = responseReceived.product_variations.filter((product) => {
            var signFound = false;
            product.sign.forEach((sign) => {
                if (sign === Object.values(selectedOpt)[0]){
                    signFound = true;
                } 
            });
            if(signFound){
                return true;
            }
            return false;
        });

        var variationSelected = filteredElements.filter((product) => {
            var signFound = false;
            product.sign.forEach((sign) => {
                if (sign === Object.values(selectedOpt)[1]){
                    signFound = true;
                } 
            });
            if(signFound){
                return true;
            }
            return false;
        });
        
        var productObject = this.generateProductValues(variationSelected[0],
                            responseReceived.primary_product);
        var temp = this.getAttributeToSelectedOptionMap(responseReceived);
        this.setState({
            product:productObject,
            attributes : responseReceived.attributes,
            productVariations : responseReceived.product_variations,
            options : responseReceived.options,
            selectedOptions : responseReceived.selected_option_ids,
            attributeToSelectedMap : temp
        });
    }


    // ====================================================
    // Handle click on Attribute
    // ====================================================
    handleOnAttributeClick = (item) => {    

        // Selected attribute. Either Colour/Storage.
        var attributeSelected = this.state.attributes.find((attr) => {
            if(item.attrib_id === attr._id){
                return true;
            }
            return false;
        });

        var temp = this.state.attributeToSelectedMap;
        temp[attributeSelected.name] = item._id;

        // Filter product variations based on selection
        var filteredElements = this.state.productVariations.filter((product) => {

            var signFound = false;
            product.sign.forEach((sign) => {
                if (sign === Object.values(temp)[0]){
                    signFound = true;
                } 
            });
            if(signFound){
                return true;
            }
            return false;
        });

        var variationSelected = filteredElements.filter((product) => {
            var signFound = false;
            product.sign.forEach((sign) => {
                if (sign === Object.values(temp)[1]){
                    signFound = true;
                } 
            });
            if(signFound){
                return true;
            }
            return false;
        });

        var productObject = this.generateProductValues(variationSelected[0],this.state.product);
        this.setState({
            productId:item._id,
            product:productObject
        });
    }
    


    // ====================================================
    // Generate Product Values using Response / Variation selected
    // ====================================================
    // Change this for iterating Product attributes
    // for(const [key, value] of Object.entries(responseReceived)){
    //     if(variationSelected[key]){
    //         productObject[key] = variationSelected.key;
    //     } else {
    //         productObject[key] = value;
    //     }
    // }
    generateProductValues = (variationSelected,responseReceived) => {
        var productObject = {};

        if(variationSelected._id){
            productObject._id = variationSelected._id;
        } else {
            productObject._id = responseReceived._id;
        }
        if(variationSelected.name){
            productObject.name = variationSelected.name;
        } else {
            productObject.name = responseReceived.name;
        }
        if(variationSelected.mark_price){
            productObject.mark_price = variationSelected.mark_price;
        } else {
            productObject.mark_price = responseReceived.mark_price;
        }
        if(variationSelected.sale_price){
            productObject.sale_price = variationSelected.sale_price;
        } else {
            productObject.sale_price = responseReceived.sale_price;
        }
        if(variationSelected.sale_msg){
            productObject.sale_msg = variationSelected.sale_msg;
        } else {
            productObject.sale_msg = responseReceived.sale_msg;
        }
        if(variationSelected.desc){
            productObject.desc = variationSelected.desc;
        } else {
            productObject.desc = responseReceived.desc;
        }
        if(variationSelected.images){
            productObject.images = variationSelected.images;
        } else {
            productObject.images = responseReceived.images;
        }
        return productObject;
    }


    // ====================================================
    // To check if Button should be active
    // ====================================================
    shouldButtonBeActive = (item) => {
        for(var value of Object.values(this.state.attributeToSelectedMap)) {
            if (item._id === value){
                return true;
            }
        }
        return false;
    }


    // ====================================================
    // Create the div container for 
    // 1) Availability message 
    // 2) Available attributes
    // ====================================================
    getProductAttributes = (attributes,options) => {
        let response = attributes.map((item,index) => {
            
            // Get Attribute
            let selectedAttr = options.filter((optionItem) => {
                if(item._id === optionItem.attrib_id){
                    return true;
                }
                return false;
            });
            let selectedLength = selectedAttr.length;
            // Generate Availability Message
            let attributeString = selectedLength + " " + item.name + ' Available';

            let list = selectedAttr.map((item) => {
                return (
                <li className="p-2" key={item._id}>
                    <button className={"nav-link btn btn-link " + (this.shouldButtonBeActive(item)?'active':'')} 
                        style={style.attributeButtonStyle}
                        onClick={()=>this.handleOnAttributeClick(item)}>
                        {item.name}
                    </button>
                </li>);
            })
            
            return (
                <div className="container mb-2" key={index}>
                    <p className="text-muted">
                        {attributeString}
                    </p>
                    <div>
                        <ul className="nav nav-pills">
                            {list}
                        </ul>
                    </div>
                </div>
            );
        });
        return response;
    }


    // ====================================================
    // To get length of Object
    // ====================================================
    getLength = (product) => {
        return Object.keys(product).length;
    }


    // ====================================================
    // Create Map of Attribute to Selected Option
    // e.g. Colour -> id
    // ====================================================
    getAttributeToSelectedOptionMap = (productDetail) => {
        if(this.state.attributeToSelectedMap && 
            !this.getLength(this.state.attributeToSelectedMap)){
            
            var attributes = productDetail.attributes.reverse();
            var options = productDetail.options;
            var selectedSign = productDetail.selected_option_ids;
            var temp = {};
            attributes.forEach((attr) => {

                var filteredOption = options.filter((option) => {
                    if(option.attrib_id===attr._id){
                        return true;
                    }
                    return false;
                });

                var selectedValue;
                filteredOption.forEach((option) => {
                    // selectedValue = selectedSign.filter((sign) => {
                    //     console.log('compare : '+ sign + " : " + option._id);
                    //     if(sign === option._id){
                    //         return true;
                    //     }
                    //     return false;
                    // });
                    if(selectedSign[0]===option._id){
                        selectedValue = selectedSign[0];
                    } else if (selectedSign[1]===option._id){
                        selectedValue = selectedSign[1];
                    }
                });
                

                temp[attr.name] = selectedValue;
            });
            return temp;
        }
        return this.state.attributeToSelectedMap;
    }


    // ====================================================
    // Main Render 
    // ====================================================
    render() {

        if(this.state && this.getLength(this.state.product)){

            // To display market price/sale price
            let displaySalePrice = false;
            if(this.state.product.sale_price < this.state.product.mark_price) {
                displaySalePrice = true;
            }

            // let productAttributes = <ProductAttribute attributes={attributes} options={options} />;
            let productAttributes = 
                this.getProductAttributes(this.state.attributes,this.state.options);

            return (
                <div className="w-75 m-auto">
                    <div className="container float-left w-50 p-2" style={style.sampleBorder}>
                        <ProductImageComponent data={this.state.product.images}/>
                    </div> 
                    <div className="container float-left w-50 p-2 " style={style.sampleBorder}>
                        <div className="card bg-light">
                            <div className="card-body">
                                {/* Name and Description */}
                                <h5 className="card-title font-weight-bold">{this.state.product.name}</h5>
                                <p className="card-text text-justify mt-4" style={style.descriptionStyle}>
                                    {this.state.product.desc}
                                </p>
                                
                                {/* Price - Sale price if present, else Market price */}
                                {displaySalePrice ? 
                                    <h5 className="card-subtitle text-muted text-left font-weight-bold mt-2 float-left w-100">
                                        <i className="fas fa-rupee-sign fa-sm"></i>
                                        {this.state.product.sale_price.toFixed(2)}
                                        <del className="pl-2" style={style.descriptionStyle}>
                                            {this.state.product.mark_price.toFixed(2)}
                                        </del>
                                        <p className="text-primary">
                                            <small>
                                            ({this.state.product.sale_msg})
                                            </small>
                                        </p>
                                    </h5> :
                                    <h5 className="card-subtitle text-muted text-left font-weight-bold mt-2 float-left w-100">
                                        <i className="fas fa-rupee-sign fa-sm"></i>
                                        {this.state.product.mark_price}
                                    </h5>
                                }

                                {/* Attributes */}
                                <div className="row float-left">
                                    {productAttributes}
                                </div>
                                {/* Add to cart button */}
                                <button type="button" className="btn btn-primary btn-block">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
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

export default ProductDetail;
