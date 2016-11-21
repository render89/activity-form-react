import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import '../node_modules/react-mdl/extra/material.css';
import '../node_modules/react-mdl/extra/material.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
	name: '',
	phone_id: '',
	activity_id: '',
	imagePreviewUrl: '',
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
			state.name = action.payload;
			break;
		case 'update_phone':
			state.phone_id = action.payload;
			break;
		case 'update_activity':
			state.acitivity_id = action.payload;
			break;
		case 'change_contract':
			state.contract = action.payload;
			break;
		case 'change_offer':
			state.offer = action.payload;
			break;
		case 'update_image_preview':
			state.imagePreviewUrl = action.payload;
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
