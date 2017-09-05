import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'redux/reducers'

const middleware = applyMiddleware(thunk)

export default createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	middleware
)
