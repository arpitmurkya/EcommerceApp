import axios from 'axios';

// Constants
import DefaultConstants from './../constants/DefaultConstants';
import ActionTypes from './../constants/ActionTypes';

export function getProductsList(pageIndex){
    let URL = DefaultConstants.FETCH_PRODUCTS_URL;
    let requestURL = URL + pageIndex;
    let fetchRequest = axios.get(requestURL);
    return (dispatch) => {
        fetchRequest.then((response) => {
            dispatch({
                type:ActionTypes.FETCH_PRODUCTS,
                payload:response.data
            })
        });
        fetchRequest.catch((error) => {

        });
    };
}
