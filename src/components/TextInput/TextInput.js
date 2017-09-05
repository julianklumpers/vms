import React, {Component} from 'react'
import _ from 'lodash'

import shared from 'shared.css'

export class MyForm extends Component {

	constructor(props) {
		super(props);

		this.validate = this.validate.bind(this)
		this.getInputs = this.getInputs.bind(this)
	}


	getInputs(form) {

		let inputs = {}

		_.filter(form, (elem) => {
			if(elem.tagName === 'INPUT') {
				return inputs[elem.name] = elem
			}
		})

		console.log(inputs)
		return inputs
	}

	validate(e) {
		e.preventDefault()



		const formData = new FormData(e.target)
		let errors = {}
		let values = {}

		const inputs = this.getInputs(this.refs.form)

		console.log(this.props.children)

		_.forEach(inputs, (input) => {

			if(input.dataset.required && !input.value) {
				errors[input.name] = 'Dit veld is verplicht'
				input.nextSibling.innerHTML = `${errors[input.name]}`
			} else {
				values[input.name] = input.value
			}

			if(input.type === 'email') {
				const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				const emailValid = re.test(input.value)
				if(!emailValid) {
					errors[input.name] = 'Dit is geen geldig email adres.'
				} else {
					values[input.name] = input.value
				}
			}
		})


		this.props.testForm(errors, values)
	}

	render() {
		const children = React.Children.map(this.props.children, (child) =>
	    React.cloneElement(child, {

	    })
	  )
		return (
			<form onSubmit={this.validate} ref="form">
				{children}
			</form>
		)
	}
}


export class InputGroup extends Component {

	render() {
		return (
			<div className={shared.formGroup}>
				<label className={shared.formLabel}>{this.props.label}</label>
				<input className={shared.formError} type={this.props.type} name={this.props.name} placeholder={this.props.placeholder} />
				<span className={shared.formError}>{this.props.foo}</span>
			</div>
		)
	}
}
