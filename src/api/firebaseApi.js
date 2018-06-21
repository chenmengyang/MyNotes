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
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

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

// get all cl-posts
export const getClPosts = async () => {
    let res = await queryFirestore('cl-dgy');
    return res;
}

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

/**
 * query firestore
 * @param {string} collection       firestore collection name
 * @param {string} document         firestore document id under collection
 * @returns {Promise}               document(s) object
 */
const queryFirestore = async (collection, document) => {
    try {
        if (!collection) {
            throw new Error('collection name can`t be empty');
        } else if ( collection && !document ) {
            // query all documents in a collection
            const ref = db.collection(collection);
            const querySnapshot = await ref.get();
            let result = {};
            querySnapshot.forEach((doc) => {
                result[doc.id] = doc.data();
            })
            return result;
        } else if ( collection && document ) {
            // query single document
            const ref = db.collection(collection).doc(document);
            const doc = await ref.get();
            if (doc.exists) {
                return doc.data();
            }
        }
    } catch(err) {
        throw new UserException(err.code, err.message);
    }
};