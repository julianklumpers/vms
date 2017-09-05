import React from 'react'
import logo from 'components/Logo/logo.png'

const Logo = (props) => {
	return (
		<div style={{paddingLeft:10+'px'}}>
      <img src={logo} alt="Koppert Biological Systems" style={{width:200+'px'}} />
    </div>
	)
}

export default Logo