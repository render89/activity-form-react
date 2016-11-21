import React from 'react';
import * as rmd from 'react-mdl';
import { connect } from 'react-redux';

class Contract extends React.Component {
	
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
	
	handleChangeContractNumber(event){
		let contract = this.props.store.contract;
		contract.number = event.target.value;
		this.props.dispatch({ type: 'change_contract', payload: contract });
	};
	
	render() {
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
    	);
	}
};

export default connect(
	state => ({
		store: state
	})
)(Contract);