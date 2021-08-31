const admin = require('firebase-admin');

function firebaseInit(serviceAccntConfig) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccntConfig)
    });

//     const db = admin.firestore();

// //    db.collection('users').get().then(
// //         (snapshot) => {
// //             snapshot.forEach((doc) => {
// //                 console.log(doc.id, '=>', doc.data());
// //             });
// //         });
    
//     return {
//         db
//     }
}

module.exports = firebaseInit;
