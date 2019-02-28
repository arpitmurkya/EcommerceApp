import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// CSS
import './App.css';
import './resources/css/bootstrap.css';

// Store
import {connect} from 'react-redux'


// Action Creators
import { getProductDetails } from './actions/ProductDetailAction';
import { getProductsList } from './actions/ProductListingAction';

// Components
import Header from './components/Header';
import Footer from './components/Footer'
import ProductListing from './components/ProductListingComponent';
import ProductDetail from './components/ProductDetailComponent';


class App extends Component {

  render() {

    return (
      <div className="App">
        <Header ref={this.applyRef}/>
        <Switch>
          <Route exact path='/' 
            render={(props) => <ProductListing {...this.props} />} 
          />
          <Route exact path='/products/:productId'
            render={(props) => <ProductDetail {...this.props} params={props.match.params}/>} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productList:state.productList,
    productDetail:state.productDetail
  }
};

const mapDispatchToProps = (dispatch) => ({
  getProductsList: id => dispatch(getProductsList(id)),
  getProductDetails: (id,func) => dispatch(getProductDetails(id,func)),
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
