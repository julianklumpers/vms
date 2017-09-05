import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Loader } from 'components'
@connect((store) => {
  console.log(store)
})
export default (WrappedComponent) => {
  return class LoadFirst extends Component {
    render() {
      console.log(this.props)
      return <WrappedComponent {...this.props} />
    }
  }
}
