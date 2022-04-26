'use strict';

const firebaseAdmin = require("firebase-admin");

const firebaseCredentials = {
  projectId: "dindinfinance",
  clientEmail: "firebase-adminsdk-xmgz0@dindinfinance.iam.gserviceaccount.com",
  privateKey: process.env.FB_PRIVATE_KEY
};

const initializeApp = () => firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseCredentials),
});

const getAuth = firebaseAdmin.auth;

let firebaseApp = null;

function getFirebaseInstance(){

    if (!firebaseApp)
        firebaseApp = initializeApp();

    return {
        async generateFirebaseAuthToken(idUsuario){
            return getAuth().createCustomToken(`uid@${idUsuario}`)
        },
    
        async getFirebaseIdByToken(token){
            const verifyIdTokenResult = await getAuth().verifyIdToken(token);
            return verifyIdTokenResult.uid;
        },
    
        async getFirebaseUserById(uid){
            return getAuth().getUser(uid);
        }
    }

}

module.exports = {
    get firebaseServices() { 
        return getFirebaseInstance()
    }
}