import React, { Component } from 'react'

import {
  BreadCrumbs
} from 'components'

class DepartmentContainer extends Component {
  render() {
    return (
      <div>
        <BreadCrumbs path={this.props.match} />
      </div>
    )
  }
}

export default DepartmentContainer
