import { database, authenticate } from 'config/firebase'

export const auth = (email, password) => {
	return authenticate.signInWithEmailAndPassword(email, password)
}

export const getUser = () => {
	const uid = authenticate.currentUser.uid
	return database.ref(`/users/${uid}`)
		.once('value')
		.then((snapshot) => {
	  	if(snapshot.val()) {
	  		return snapshot.val()
	  	} else {
	  		const error = {
	  			code: 'auth/account-not-in-db'
	  		}
	  		throw error
	  	}
  })
}

export const logout = () => {
	return authenticate.signOut()
}

// export const saveUser = (user, timestamp) => {
// 	return database.ref('users/' + user.uid)
// 		.set({
// 			info: user,
// 			lastLoggedIn: timestamp
// 		}).then(() => user)
// }
