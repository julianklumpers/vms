import React from 'react'
import shared from 'shared.css'
import styles from './styles.css'
import { formatTimestampToDate } from 'helpers/helpers'

import {
  Form,
  FormGroup,
  FormInput,
  FormDivider
} from 'components'

const Customer = (props) => {
  return(
    <div className={shared.flexColumn}>
      <div className={shared.center}>
        <span className={styles.avatarContainer}>
          <i className={`material-icons ${styles.avatar}`}>account_circle</i>
          <i onClick={props.onToggleForm} className={`material-icons ${styles.customerEdit}`}>edit</i>
        </span>
        <span>
          {props.customer.klantnaam}
        </span>
        <span className={styles.line}></span>
      </div>
      {
        props.toggleForm
        ?
          <div className={styles.customerDetails}>
            <p>
              <strong>Adres</strong>
              {props.customer.adres}<br />
              {props.customer.postcode}, {props.customer.woonplaats}
            </p>
            <p>
              <strong>Contactpersson</strong>
              {props.customer.contactpersoon}<br />
              {props.customer.telefoon}
            </p>
            <p>
              <strong>E-mail</strong>
              {props.customer.email}
            </p>
            {
              props.customer.beschrijving &&
              <p style={{fontSize: 12}}>
                <strong>Opmerking</strong>
                {props.customer.beschrijving}
              </p>
            }
            <span className={styles.line}></span>
            <p style={{fontSize: 12}}>
              <span><i><b>Datum aangemaakt: </b></i>{formatTimestampToDate(props.customer.dateAdded)}</span><br />
              {
                props.customer.dateUpdated &&
                <span><i><b>Datum gewijzigd: </b></i>{formatTimestampToDate(props.customer.dateUpdated)}</span>
              }
            </p>
          </div>
        :
          <Form onFormSubmit={props.onFormSubmit}>
            <FormGroup>
              <FormInput
                type="text"
                name="adres"
                label="Adres + huisnummer"
                validations={['required']}
                width="70%"
                value={props.customer.adres}
                className={styles.formInput} />

              <FormInput
                type="text"
                name="klantnummer"
                label="Klantnummer"
                validations={['required', 'number']}
                width="30%"
                value={props.customer.klantnummer}
                className={styles.formInput} />
            </FormGroup>

            <FormGroup>
              <FormInput
                type="text"
                name="postcode"
                label="Postcode"
                validations={['required', 'zipcode']}
                value={props.customer.postcode}
                width="30%"
                className={styles.formInput} />

              <FormInput
                type="text"
                name="woonplaats"
                label="Woonplaats"
                validations={['required']}
                value={props.customer.woonplaats}
                width="70%"
                className={styles.formInput} />
            </FormGroup>

            <FormInput
              type="text"
              label="Contactpersoon"
              validations={['required']}
              name="contactpersoon"
              value="Julian Klumpers"
              className={styles.formInput} />

            <FormInput
              type="text"
              name="telefoon"
              validations={['required', 'phone']}
              label="Telefoon"
              value={props.customer.telefoon}
              className={styles.formInput} />

            <FormInput
              type="text"
              name="email"
              label="Email"
              validations={['required', 'email']}
              value={props.customer.email}
              className={styles.formInput} />

            <FormInput
              type="textarea"
              name="beschrijving"
              label="Beschrijving"
              value={props.customer.beschrijving}
              className={styles.formInput} />

            <FormDivider />

            <FormGroup>
              <FormInput
                type="button"
                name="submit"
                width="50%"
                buttonText="Aanpassen" />

              <a href="#" onClick={props.onToggleForm}>Cancel</a>
            </FormGroup>
          </Form>
      }
    </div>
  )
}

export default Customer
