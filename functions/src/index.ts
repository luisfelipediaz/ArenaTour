import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
export const userClaims = functions.auth.user().onCreate(async user => {
    await admin.auth().setCustomUserClaims('1IIAMuFjNjWKIEmtx1XTTm4YVrg2', { admin: true, role: 'admin' });
});