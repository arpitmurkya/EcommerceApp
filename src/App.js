import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// CSS
import './App.css';
import './resources/css/application.css';
import './resources/css/bootstrap.css';

// Store
import {connect} from 'react-redux'

// Components
import Header from './components/Header';
import Footer from './components/Footer'
import ProductListing from './components/ProductListingComponent';
import ProductDetail from './components/ProductDetailComponent';

// Action Creators
import { getProductDetails } from './actions/ProductDetailAction';
import { getProductsList } from './actions/ProductListingAction';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      productList:[],
      displayFooter:true
    }
  }

  // handleScroll = (e) => {
  //   if(window.pageYOffset > 50 && window.pageYOffset < 900) {
  //     console.log('scrolled');
  //     this.setState({
  //       displayFooter: true,
  //     });
  //   } else {
  //     this.setState({
  //       displayFooter: false,
  //     });
  //   }
  // }

  // applyRef = ref => {
  //   this.vn = ref;
  //   this.vn.addEventListener('scroll', this.handleScroll);
  // }

  render() {

    return (
      <div className="App">
        <Header ref={this.applyRef}/>
        <Switch>
          <Route exact path='/' 
            render={(props) => <ProductListing {...this.props} />} 
          />
          <Route exact path='/products/:productId'
            render={(props) => (this.state.displayFooter && 
              <ProductDetail {...this.props} params={props.match.params}/>)} />
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
