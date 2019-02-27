import { combineReducers } from 'redux';

// Reducers
import ProductListingReducer from './ProductListingReducer';
import ProductDetailReducer from './ProductDetailReducer';

let rootReducer = combineReducers({
    productList : ProductListingReducer,
    productDetail : ProductDetailReducer
})

export default rootReducer;
