import firebase from "firebase";
var config = {
    apiKey: "AIzaSyDXc9cMFVcDaygluXEqa8NTWhqygzilzhg",
    authDomain: "mynotes-addc6.firebaseapp.com",
    databaseURL: "https://mynotes-addc6.firebaseio.com",
    projectId: "mynotes-addc6",
    storageBucket: "mynotes-addc6.appspot.com",
    messagingSenderId: "249648918317"
};

firebase.initializeApp(config);

/**
 * login to admin app with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export const signIn = async (email, password) => {
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);
        return {
            email: res.user.email,
            uid: res.user.uid,
        };
    } catch(err) {
        throw new UserException(err.code, err.message);
    }
}

/**
 * logout to firebase
 * @returns {Promise}
 */
export const signOut = async () => {
    try {
        await firebase.auth().signOut();
    } catch(err) {
        throw new UserException(err.code, err.message);
    }
}

// currentUser
export const currentUser = firebase.auth().currentUser;

// auth state listener
export const onAuthStateChanged = (user) => firebase.auth().onAuthStateChanged(user);


// Create an exception class UserException for throwing
class UserException {
    // 
    constructor(code, message) {
        this.message = message;
        this.code = code;
    }
    // Make the exception convert to a pretty string when used as
    // a string (e.g. by the error console)
    // override
    toString() {
        return this.code + ': "' + this.message + '"';
    }
}