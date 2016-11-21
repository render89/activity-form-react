import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Contract from './ContractComponent';
import Offer from './OfferComponent';
import './index.css';
import '../node_modules/react-mdl/extra/material.css';
import '../node_modules/react-mdl/extra/material.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
	name: '',
	phone_id: '',
	activity_id: '',
	image: '',
	contract: {
		number: '',
		date: '',
		file_id: ''
	},
	offer: {
		sum: '',
		file_id: ''
	}
};

function combineReducer(state = initialState, action){
	switch (action.type) {
		case 'change_name':
			state = Object.assign({}, state, {
				name: action.payload
			});
			break;
		case 'change_phone_id':
			state = Object.assign({}, state, {
				phone_id: action.payload
			});
			break;
		case 'change_activity_id':
			state = Object.assign({}, state, {
				activity_id: action.payload
			});
			break;
		case 'change_contract':
			state = Object.assign({}, state, {
				contract: action.payload
			});
			break;
		case 'change_offer':
			state = Object.assign({}, state, {
				offer: action.payload
			});
			break;
		case 'change_image':
			state = Object.assign({}, state, {
				image: action.payload
			});
			break;
		default: 
			return state;
	}
	return state;
};

const store = createStore(combineReducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
