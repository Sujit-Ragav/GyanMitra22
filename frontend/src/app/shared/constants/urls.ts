import { environment } from "src/environments/environment";

const BASE_URL = "http://localhost:3000";
export const PRODUCT_URL=BASE_URL+'/api/products';
export const PRODUCT_BY_ID_URL=PRODUCT_URL+'/';
export const PRODUCT_BY_GROUP=PRODUCT_URL+'/group/';
export const USER_LOGIN=BASE_URL+"/api/users/login";

export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const USER_LIST=BASE_URL+'/api/users/retrieve';
export const ALL_USER_LIST=BASE_URL+'/api/users/retrieveall';
export const WORSHOP_NAME=BASE_URL+'/api/users/retrieveWName';
export const EVENTS_NAMES=BASE_URL+'/api/users/retrieveEName';
export const PWORSHOP_NAME=BASE_URL+'/api/users/retrievePWName';
export const PEVENTS_NAMES=BASE_URL+'/api/users/retrievePEName';
export const SEARCH_USER=BASE_URL+'/api/users/search';
export const ORDERS_URL = BASE_URL + '/api/orders';
export const GROUP_URL=BASE_URL+'/api/group';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDERS_EVENT_PAY_URL=ORDERS_URL+'/eventpay';

export const GROUP_CHECK_REGISTER=GROUP_URL+'/checkRegister';
export const GROUP_REGISTER=GROUP_URL+'/register';
export const GROUP_CREATE=GROUP_URL+'/create';
export const EVENT_REGISTER_URL= ORDERS_URL+'/registerEvent';
export const TEAM_LIST=BASE_URL+'/api/orders/retrieve';

export const ADD_PRODUCT_URL=BASE_URL+'/api/products/addproduct';