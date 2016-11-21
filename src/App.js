import React from 'react';
import * as rmd from 'react-mdl';
import Contract from './ContractComponent';
import Offer from './OfferComponent';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'whatwg-fetch';
import { connect } from 'react-redux';

class App extends React.Component {
	
	handleChangeName(event) {
		this.props.dispatch({ type: 'change_name', payload: event.target.value });
	};

	handleChangeActivity(event) {
		this.props.dispatch({ type: 'change_activity_id', payload: event.value});
		if (event.value !== '3') {
			this.props.dispatch({ type: 'change_contract', payload: { number: "", date: "", file_id: "" }});
		}
		if (event.value !== '4') {
			this.props.dispatch({ type: 'change_offer', payload: { sum: "", file_id: "" }});
		}
	};
	
	handleChangePhone(event) {
		this.props.dispatch({ type: 'change_phone_id', payload: event.value });
	};
	
	handleImageChange(e) {
		e.preventDefault();
    	let reader = new FileReader();
    	let file = e.target.files[0];
		reader.onloadend = () => {
			this.props.dispatch({ type: 'change_image', payload: reader.result });
    	}
    	reader.readAsDataURL(file)
	};
	
	handleSubmitForm() {
		fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.props.store)
		})
	};
	
	optionsActivity = [
		{ value: '1', label: 'Звонок' },
		{ value: '2', label: 'Встреча' },
		{ value: '3', label: 'Договор' },
		{ value: '4', label: 'Коммерческое предложение' }
	];	
		
	optionsPhone = [
		{ value: '1', label: '0933339977' },
		{ value: '2', label: '0999997223' },
		{ value: '3', label: '0677653211' },
		{ value: '4', label: '0662233445' }
	];	

	render() {
		
		let {image} = this.props.store;
		let imagePreview = image ? <img alt="img" src={image} style={{maxWidth: '100px', maxHeight: '100px'}}/> : <h6>Загрузите фото:</h6>;	
		
		return (
			<div>
				<rmd.Card shadow={0} style={{width: '512px', minHeight: '556px', position: 'absolute', padding: '10px', height: 'auto'}}>
					<h4>Форма добавления активности</h4>
					<div>
						<h6>Введите ФИО:</h6>
						<rmd.Textfield
							onChange={this.handleChangeName.bind(this)}
							label="ФИО"
							floatingLabel
							value={this.props.store.name}
							style={{marginTop: '-20px', width: '100%'}} />
					</div>
					<div className="main">
						<h6>Введите номер телефона:</h6>
						<Select
							name="form-field-name"
							value={this.props.store.phone_id}
							options={this.optionsPhone}
							onChange={this.handleChangePhone.bind(this)}
							style={{align: 'center'}} />
					</div>
					<div className="main">
						<h6>Выберите тип активности:</h6>
						<Select
							name="form-field-name"
							value={this.props.store.activity_id}
							options={this.optionsActivity}
							onChange={this.handleChangeActivity.bind(this)}
							style={{align: 'center'}} />
					</div>
					<div>
						<div>
							{imagePreview}
						</div>
						<input type="file" onChange={this.handleImageChange.bind(this)} />
					</div>
					{this.props.store.activity_id === '3' ? <Contract /> : ""}
					{this.props.store.activity_id === '4' ? <Offer /> : ""}
					<rmd.CardActions border>
						<rmd.Button colored type="submit" onClick={this.handleSubmitForm.bind(this)}>
							Отправить форму
						</rmd.Button>
					</rmd.CardActions>	
				</rmd.Card>
				<rmd.Card shadow={0} style={{width: '512px', backgroundColor:'LavenderBlush', position: 'fixed', right: 0, padding: '10px'}}>
					<div>
						<pre>
							{JSON.stringify(this.props.store, null, 2)}
						</pre>
					</div>
				</rmd.Card>
			</div>
    	);
	}
}

export default connect(
	state => ({
		store: state
	})
)(App);