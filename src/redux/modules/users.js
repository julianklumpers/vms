import { auth, getUser, logout } from 'auth/auth'

const AUTH_USER 						= 'AUTH_USER'
const UNAUTH_USER 					= 'UNAUTH_USER'
const FETCHING_USER 				= 'FETCHING_USER'
const FETCHING_USER_FAILED 	= 'FETCHING_USER_FAILED'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const REMOVE_FETCHING 			= 'REMOVE_FETCHING'


export const authUser = (uid) => {
	return {
		type: AUTH_USER,
		uid
	}
}

export const unauthUser = (val) => {
	return {
		type: UNAUTH_USER,
		val
	}
}

export const fetchingUser = () => {
	return {
		type: FETCHING_USER
	}
}

const fetchingUserFailed = (err) => {
	return {
		type: FETCHING_USER_FAILED,
		errCode: err
	}
}

export const fetchingUserSuccess = (user, uid, timestamp) => {
	return {
		type: FETCHING_USER_SUCCESS,
		user,
		uid,
		timestamp,
	}
}

export const removeFetching = () => {
	return {
		type: REMOVE_FETCHING
	}
}

// thunks
export const fetchAndHandleUser = (email, password) => {
	return (dispatch) => {
		dispatch(fetchingUser())
		return auth(email, password).then(() => getUser())
    .then((user) => dispatch(fetchingUserSuccess(user.info, user.info.uid, Date.now())))
		.then((user) => dispatch(authUser(user.uid)))
    .catch((error) => {
      console.log(error)
      dispatch(fetchingUserFailed(error.code))
    })
	}
}

export const logoutAndUnauthUser = () => {
	return (dispatch) => {
		logout()
		dispatch(unauthUser(null))
	}
}

// const initailUserState = {
// 	lastUpdated: 0,
// 	info: {
// 		name: '',
// 		email: '',
// 		avatarUrl: '',
// 		uid: '',
// 	}
// }
// // user composer
// const user = (state=initailUserState, action) => {
// 	console.log(action)
// 	switch(action.payload.type) {
// 		case FETCHING_USER_SUCCESS:
// 			return {
// 				lastLoggedIn: action.timestamp,
// 				info: action.user
// 			}
// 		default:
// 			return state
// 	}
// }

const initialState = {
	isFetching: false,
	error: '',
	isAuthed: undefined, // important !!!
	authedId: ''
}
export default (state=initialState, action) => {
	switch(action.type) {
		case AUTH_USER:
			return {
				...state,
				isAuthed: true,
				authedId: action.uid
			}
		case UNAUTH_USER:
			return {
				...state,
				isFetching: false,
				isAuthed: action.val,
				authedId: ''
			}
		case FETCHING_USER:
			return {
				...state,
				isFetching: true
			}
		case FETCHING_USER_FAILED:

			let message

			switch(action.errCode) {
				case 'auth/invalid-email' :
					message = 'U moet een geldig email adres opgeven.'
				break
				case 'auth/user-disabled' :
					message = 'Uw account is geblokkeerd.'
				break
				case 'auth/user-not-found' :
					message = 'Uw gegevens komen niet voor in onze database.'
				break
				case 'auth/wrong-password' :
					message = 'Het opgegeven wachtwoord komt niet overeen.'
				break
				case 'auth/account-not-in-db' :
					message = 'Er is een wel een account voor u aangemaakt maar nog niet geverifieerd. Neem contact op met Julian Klumpers, email: jklumpers@koppert.nl.'
				break
				default :
					message = 'Oops, er ging iets mis.'
			}

			return {
				...state,
				isFetching: false,
				error: message
			}
		case FETCHING_USER_SUCCESS:
			return action.user === null
				? {
					...state,
					isFetching: false,
					error: ''
				}
				: {
					...state,
					isFetching: false,
					error: '',
					user: {
						lastLoggedIn: action.timestamp,
						uid: action.uid,
						info: action.user
					}
				}
		case REMOVE_FETCHING:
			return {
				...state,
				isFetching: false
			}
		default:
			return state
	}
}
