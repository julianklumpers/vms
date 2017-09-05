import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { AppContainer } from 'containers'
import RulesWithStore from 'config/validationRules'

const validationRules = RulesWithStore(store)

const root = document.getElementById('root')

render(<Provider store={store}><AppContainer /></Provider>,	root)

if(module.hot) {
  module.hot.accept()
}
