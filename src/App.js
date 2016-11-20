import React from 'react';
import * as rmd from 'react-mdl';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'whatwg-fetch';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone_id: '',
			activity_id: '',
			contract: {
				number: '',
				date: '',
				file_id: ''
			},
			offer: {
				sum: '',
				file_id: ''
			}
		}
	};
	handleChangeName(event) {
		this.setState({
			name: event.target.value	
		})
	};
	handleChangeOfferSum(event) {
		let offer = this.state.offer;
		let value = event.target.value;
		offer.sum = Number(Number(value).toFixed(2));
		this.setState({offer})
	};
	handleChangeActivity(event) {
		let offer = this.state.offer;
		let contract = this.state.contract;
		contract.number = null;
		contract.date = null;
		contract.file_id = null;
		offer.sum = null;
		offer.file_id = null;
		this.setState({
			activity_id: event.value
		})
		if (event.value !== '3'){
			this.setState({contract})
		}
		if (event.value !== '4'){
			this.setState({offer})
		}
	};
	handleChangePhone(event) {
		this.setState({
			phone_id: event.value
		})
	};
	handleIdContractChange() {
		let random = Math.floor(Math.random() * 10);
		let contract = this.state.contract;
		contract.file_id = random;
		this.setState({contract})
	};
	handleDateContractChange(event) {
		let contract = this.state.contract;
		contract.date = event.target.value
		this.setState({contract})
	};
	handleIdOfferChange() {
		let random = Math.floor(Math.random() * 10);
		let offer = this.state.offer;
		offer.file_id = random;
		this.setState({offer})
	};
	handleChangeContractNumber(event){
		let contract = this.state.contract;
		contract.number = event.target.value;
		this.setState({contract})
	};
	handleSubmit(e) {
		e.preventDefault();
	};
	handleImageChange(e) {
		e.preventDefault();
    	let reader = new FileReader();
    	let file = e.target.files[0];
		reader.onloadend = () => {
    		this.setState({
        		imagePreviewUrl: reader.result
    		})
    	}
    	reader.readAsDataURL(file)
	};
	handleSubmitForm() {
		fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
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
						style={{marginTop: '-20px', width: '100%', backgroundColor:'LavenderBlush'}} />
				</div>
				<div className="main">
					<h6>Выберите дату:</h6>
					<input style={{backgroundColor:'LavenderBlush'}} type="date" onChange={this.handleDateContractChange.bind(this)} />
				</div>
				<div className="main">
					<h6>Выберите файл:</h6>
					<input style={{backgroundColor:'LavenderBlush'}} type="file" onChange={this.handleIdContractChange.bind(this)} />
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
						style={{marginTop: '-20px', width: '100%', backgroundColor:'LavenderBlush'}} />
				</div>
				<div className="main">
					<h6>Выберите файл:</h6>
					<input style={{backgroundColor:'LavenderBlush'}} type="file" onChange={this.handleIdOfferChange.bind(this)} />
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
		let {imagePreviewUrl} = this.state;
		let imagePreview = imagePreviewUrl ? <img alt="img" src={imagePreviewUrl} style={{maxWidth: '100px', maxHeight: '100px'}}/> : <h6>Загрузите фото:</h6>;	
		
		return (
			<div>
				<rmd.Card shadow={0} style={{width: '512px', minHeight: '556px', position: 'absolute', backgroundColor:'LavenderBlush', padding: '10px', height: 'auto'}}>
					<h4>Форма добавления активности</h4>
					<div>
						<h6>Введите ФИО:</h6>
						<rmd.Textfield
							onChange={this.handleChangeName.bind(this)}
							label="ФИО"
							floatingLabel
							value={this.state.name}
							style={{marginTop: '-20px', width: '100%'}} />
					</div>
					<div className="main">
						<h6>Введите номер телефона:</h6>
						<Select
							name="form-field-name"
							value={this.state.phone_id}
							options={optionsPhone}
							onChange={this.handleChangePhone.bind(this)}
							style={{'align': 'center', backgroundColor:'LavenderBlush'}} />
					</div>
					<div className="main">
						<h6>Выберите тип активности:</h6>
						<Select
							name="form-field-name"
							value={this.state.activity_id}
							options={optionsActivity}
							onChange={this.handleChangeActivity.bind(this)}
							style={{'align': 'center', backgroundColor:'LavenderBlush'}} />
					</div>
					<div>
						<div>
							{imagePreview}
						</div>
						<form onSubmit={this.handleSubmit.bind(this)}>
							<input style={{backgroundColor:'LavenderBlush'}} type="file" onChange={this.handleImageChange.bind(this)} />
							<rmd.Button type="submit" onClick={this.handleSubmit.bind(this)}>
								Отправить файл
							</rmd.Button>
						</form>
					</div>
					{this.state.activity_id === '3' ? this.renderContract() : ""}
					{this.state.activity_id === '4' ? this.renderOffer() : ""}
					<rmd.CardActions border>
						<rmd.Button colored type="submit" onClick={this.handleSubmitForm.bind(this)}>
							Отправить форму
						</rmd.Button>
					</rmd.CardActions>	
				</rmd.Card>
				<rmd.Card shadow={0} style={{width: '256px', backgroundColor:'LavenderBlush', position: 'fixed', left: '1110px', padding: '10px'}}>
					<div>
						<pre>
							{JSON.stringify(this.state, null, 2)}
						</pre>
					</div>
				</rmd.Card>
			</div>
    	);
	}
}

export default App;
