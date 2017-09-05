import React from 'react'
import rules from 'components/Forms/rules'
import validator from 'validator'

export default function(store) {

  const newRules = Object.assign(rules, {
    required: {
      method: value => {
        return !validator.isEmpty(value)
      },
      message: (value, props) => {
        return `${props.label} is verplicht`
      }
    },
    email: {
      method: value => {
        return validator.isEmail(value)
      },
      message: value => {
        return `${value} is geen geldig email adres`
      }
    },
    zipcode: {
      method: value => {
        const regex = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
        return regex.test(value)
      },
      message: value => {
        return `${value} is geen geldig postcode`
      }
    },
    phone: {
      method: value => {
        return !validator.isLength(value, {min:0,max:9})
      },
      message: value => {
        return `${value} is geen geldig telefoon nummer`
      }
    },
    number: {
      method: value => {
        return validator.isInt(value)
      },
      message: value => {
        return 'Alleen cijfers zijn toegestaan'
      }
    },
    checkCustomer: {
      method: value => {
        const customers = store.getState().customers.customers

        if(customers) {
          for(const customer in customers) {
            if(value === customers[customer].klantnaam) {
              return false
              break
            }
          }
        }

        return true
      },
      message: value => {
        return `${value} bestaat al`
      }
    },
    checkDepartmentName: {
      method: value => {
        const departmentNames = store.getState().departments.departments

        if(departmentNames) {
          for(const name in departmentNames) {
            if(value === departmentNames[name].afdelingnaam) {
              return false
              break
            }
          }
        }

        return true
      },
      message: value => {
        return `${value} is al in gebruik, kies een anderen naam`
      }
    }
  })

  return newRules
}
