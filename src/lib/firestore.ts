import firebase from 'firebase';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID
    });
}
const email: string | any = process.env.AUTH_EMAIL;
const pass: string | any = process.env.AUTH_PASS;

firebase.auth().signInWithEmailAndPassword(email, pass);

const database = firebase.firestore();

export default database;
