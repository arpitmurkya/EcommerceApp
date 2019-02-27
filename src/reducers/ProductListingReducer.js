// Action Types
import ActionTypes from '../constants/ActionTypes';

export default function ProductListingReducer(state=[], action) {

    switch(action.type){
        case ActionTypes.FETCH_PRODUCTS :
            return state.concat(action.payload.products);

        default :
            return state;
    }
}