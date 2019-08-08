import firebase from 'firebase';

let database: any = null;

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID
    });
}

try {
    const email: string | any = process.env.AUTH_EMAIL;
    const pass: string | any = process.env.AUTH_PASS;

    firebase.auth().signInWithEmailAndPassword(email, pass);

    database = firebase.firestore();
} catch (err) {
    console.log('err: ', err);
}

export default database;
