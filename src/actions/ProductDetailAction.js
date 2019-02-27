import axios from 'axios';

// Constants
import DefaultConstants from './../constants/DefaultConstants';
import ActionTypes from './../constants/ActionTypes';

export function getProductDetails(productId,callback){
    let url=DefaultConstants.FETCH_PRODUCT_DETAIL_URL;
    let requestUrl = url + productId;
    let fetchRequest = axios.get(requestUrl);
    return (dispatch) => {
        fetchRequest.then((response) => {
            dispatch({
                type:ActionTypes.FETCH_PRODUCT_DETAIL,
                payload:response.data
            });
            callback(response.data);
        });
        fetchRequest.catch((error) => {
            
        });
    };
}

