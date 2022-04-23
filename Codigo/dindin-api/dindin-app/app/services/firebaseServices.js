const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

console.log("<<env>> ------> " + process.env.GOOGLE_APPLICATION_CREDENTIALS + " <-------- <<env>>");

class firebaseServicesSingleton{
    static instance = new firebaseServicesSingleton();

    firebaseApp = null;

    constructor(){
        this.firebaseApp = initializeApp({
            credential:  applicationDefault(),
        });
        
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