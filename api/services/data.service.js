// db has been initialized in app object and should be cached after the first call

function dataService() {

    const admin = require('firebase-admin');
    const db = admin.firestore();


    function getAllCollections(collectionPath, selectFields, queryCriteria, sortCriteria, limitResults) {

        const collecionRef = db.collection(collectionPath);
        let resultsRef = collecionRef;

        if (queryCriteria) {
            resultsRef = resultsRef.where(queryCriteria);
        }
        if (limitResults) {
            resultsRef = resultsRef.limit(limitResults);
        }

        return resultsRef.listCollections();
    }


    function getAll(collectionPath, selectFields, queryCriteria, sortCriteria, limitResults) {

        const collecionRef = db.collection(collectionPath);
        let resultsRef = collecionRef;

        if (queryCriteria) {
            resultsRef = resultsRef.where(queryCriteria);
        }
        if (limitResults) {
            resultsRef = resultsRef.limit(limitResults);
        }

        return resultsRef.get();
    }


    function getById(id, collectionPath, selectFields) {
        const collecionRef = db.collection(collectionPath);
        let docRef = collecionRef.doc(id);

        return docRef.get();
    }


    function postOne(item, collectionPath) {
        const collecionRef = db.collection(collectionPath);
        let docRef = collecionRef.doc(item.id);

        return docRef.set(item);
    }


    function updateOne(item, collectionPath) {
        const collecionRef = db.collection(collectionPath);
        let docRef = collecionRef.doc(item.id);

        return docRef.set(item, { merge: true });  //do not overwrite entire document
    }


    function deleteOne(id, collectionPath) {
        const collecionRef = db.collection(collectionPath);
        let docRef = collecionRef.doc(id);

        return docRef.delete();
    }


    return {
        getAll,
        getById,
        postOne,
        updateOne,
        deleteOne
    }
}


module.exports = dataService;
