import React from 'react'

import shared from 'shared.css'

const FlexRow = (props) => {
  return <div className={shared.flexRow}>{props.children}</div>
}

export default FlexRow
