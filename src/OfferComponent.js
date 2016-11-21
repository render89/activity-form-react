import React from 'react';
import * as rmd from 'react-mdl';
import { connect } from 'react-redux';

class Offer extends React.Component {
	
	handleChangeOfferSum(event) {
		let offer = this.props.store.offer;
		let value = event.target.value;
		offer.sum = Number(Number(value).toFixed(2));
		this.props.dispatch({ type: 'change_offer', payload: offer });
	};
	
	handleIdOfferChange() {
		let random = Math.floor(Math.random() * 10);
		let offer = this.props.store.offer;
		offer.file_id = random;
		this.props.dispatch({ type: 'change_offer', payload: offer });
	};
	
	render() {
    	return (
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
    	);
	}
};

export default connect(
	state => ({
		store: state
	})
)(Offer);