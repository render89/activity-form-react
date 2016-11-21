import React from 'react';
import * as rmd from 'react-mdl';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'whatwg-fetch';
import { connect } from 'react-redux';

class App extends React.Component {
	handleChangeName(event) {
		this.props.dispatch({ type: 'change_name', payload: event.target.value });
	};
	handleChangeOfferSum(event) {
		let offer = this.props.store.offer;
		let value = event.target.value;
		offer.sum = Number(Number(value).toFixed(2));
		this.props.dispatch({ type: 'change_offer', payload: offer });
	};
	handleChangeActivity(event) {
		this.props.dispatch({ type: 'choose_activity', payload: event.value});
		if (event.value !== '3'){
			this.props.dispatch({ type: 'change_offer', payload: { sum: "", file_id: "" }});
		}
		if (event.value !== '4'){
			this.props.dispatch({ type: 'change_offer', payload: { number: "", date: '', file_id: "" }});
		}
	};
	handleChangePhone(event) {
		this.props.dispatch({ type: 'update_phone', payload: event.value });
	};
	handleIdContractChange() {
		let random = Math.floor(Math.random() * 10);
		let contract = this.props.store.contract;
		contract.file_id = random;
		this.props.dispatch({ type: 'change_contract', payload: contract });
	};
	handleDateContractChange(event) {
		let contract = this.props.store.contract;
		contract.date = event.target.value
		this.props.dispatch({ type: 'change_contract', payload: contract });
	};
	handleIdOfferChange() {
		let random = Math.floor(Math.random() * 10);
		let offer = this.props.store.offer;
		offer.file_id = random;
		this.props.dispatch({ type: 'change_offer', payload: offer });
	};
	handleChangeContractNumber(event){
		let contract = this.props.store.contract;
		contract.number = event.target.value;
		this.props.dispatch({ type: 'change_contract', payload: contract });
	};
	handleSubmit(e) {
		e.preventDefault();
	};
	handleImageChange(e) {
		e.preventDefault();
    	let reader = new FileReader();
    	let file = e.target.files[0];
		reader.onloadend = () => {
			this.props.dispatch({ type: 'update_image_preview', payload: reader.result });
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
	renderContract() {
		return (
			<div>
				<div className="main">
					<h6>Введите номер договора:</h6>
					<rmd.Textfield
						onChange={this.handleChangeContractNumber.bind(this)}
						label="Договор"
						floatingLabel
						style={{marginTop: '-20px', width: '100%'}} />
				</div>
				<div className="main">
					<h6>Выберите дату:</h6>
					<input type="date" onChange={this.handleDateContractChange.bind(this)} />
				</div>
				<div className="main">
					<h6>Выберите файл:</h6>
					<input type="file" onChange={this.handleIdContractChange.bind(this)} />
				</div>
			</div>
		)
	};
	renderOffer() {
		return(
			<div>
				<div className="main">
					<h6>Введите сумму:</h6>
					<rmd.Textfield
						onChange={this.handleChangeOfferSum.bind(this)}
						label="Коммерческое предложение"
						floatingLabel
						style={{marginTop: '-20px', width: '100%'}} />
				</div>
				<div className="main">
					<h6>Выберите файл:</h6>
					<input type="file" onChange={this.handleIdOfferChange.bind(this)} />
				</div>
			</div>
		)
	};
	render() {
		let optionsActivity = [
			{ value: '1', label: 'Звонок' },
			{ value: '2', label: 'Встреча' },
			{ value: '3', label: 'Договор' },
			{ value: '4', label: 'Коммерческое предложение' }
		];	
		let optionsPhone = [
			{ value: '1', label: '0933339977' },
			{ value: '2', label: '0999997223' },
			{ value: '3', label: '0677653211' },
			{ value: '4', label: '0662233445' }
		];		
		let {imagePreviewUrl} = this.props.store;
		let imagePreview = imagePreviewUrl ? <img alt="img" src={imagePreviewUrl} style={{maxWidth: '100px', maxHeight: '100px'}}/> : <h6>Загрузите фото:</h6>;	
		
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
							options={optionsPhone}
							onChange={this.handleChangePhone.bind(this)}
							style={{align: 'center'}} />
					</div>
					<div className="main">
						<h6>Выберите тип активности:</h6>
						<Select
							name="form-field-name"
							value={this.props.store.activity_id}
							options={optionsActivity}
							onChange={this.handleChangeActivity.bind(this)}
							style={{align: 'center'}} />
					</div>
					<div>
						<div>
							{imagePreview}
						</div>
						<form onSubmit={this.handleSubmit.bind(this)}>
							<input type="file" onChange={this.handleImageChange.bind(this)} />
							<rmd.Button type="submit" onClick={this.handleSubmit.bind(this)}>
								Отправить файл
							</rmd.Button>
						</form>
					</div>
					{this.props.store.activity_id === '3' ? this.renderContract() : ""}
					{this.props.store.activity_id === '4' ? this.renderOffer() : ""}
					<rmd.CardActions border>
						<rmd.Button colored type="submit" onClick={this.handleSubmitForm.bind(this)}>
							Отправить форму
						</rmd.Button>
					</rmd.CardActions>	
				</rmd.Card>
				
			</div>
    	);
	}
}

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({})
)(App);