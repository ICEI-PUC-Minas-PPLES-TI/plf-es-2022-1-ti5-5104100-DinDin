'use strict';

const firebaseAdmin = require("firebase-admin");

const firebaseCredentials = JSON.parse(process.env.FIREBASE_CREDENTIALS_OBJ);
const initializeApp = () => firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseCredentials)
});

const getAuth = firebaseAdmin.auth;

class firebaseServicesSingleton{
    static instance = new firebaseServicesSingleton();

    firebaseApp = null;

    constructor(){
        this.firebaseApp = initializeApp();
        
    }

    static getFirebaseInstance(){
        if (this.instance === null)
            this.instance = new firebaseServicesSingleton()
        // coloquei retornando assim só pra ele tipar automaticamnete
        return this.instance ?? new firebaseServicesSingleton() ;
    }

    async generateFirebaseAuthToken(idUsuario){
        return getAuth().createCustomToken(`uid@${idUsuario}`)
    }

    async getFirebaseIdByToken(token){
        const verifyIdTokenResult = await getAuth().verifyIdToken(token);
        return verifyIdTokenResult.uid;
    }

    async getFirebaseUserById(uid){
        return getAuth().getUser(uid);
    }

}

module.exports = {
    get firebaseServices() { 
        return firebaseServicesSingleton.getFirebaseInstance()
    }
}