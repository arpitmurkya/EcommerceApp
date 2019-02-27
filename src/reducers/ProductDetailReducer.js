// Action Types
import ActionTypes from '../constants/ActionTypes';

export default function ProductDetailReducer(state=[], action) {

    switch(action.type){
        case ActionTypes.FETCH_PRODUCT_DETAIL :
            return {
                ...action.payload
            };

        default :
            return state;
    }
}