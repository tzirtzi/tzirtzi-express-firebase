// db has been initialized in app object and should be cached after the first call

function defaultService() {

    const admin = require('firebase-admin');
    const db = admin.firestore();

    const controller = require("../controllers/controller.service")();
    

    function getAll(req, res, next) {
        
        function getAllService(collectionPath, selectFields, queryCriteria, sortCriteria, limitResults) {
            
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

        controller.getAll(req, res, next, getAllService, null);
    }
    
    
    function getById(req, res, next) {

        function getByIdFunction(id, collectionPath, selectFields) {
            const collecionRef = db.collection(collectionPath);
            let docRef = collecionRef.doc(id);

            return docRef.get();
        }

        controller.getById(req, res, next, getByIdFunction, null);
    }
    
    
    function postOne(req, res, next) {
        function postFunction(item, collectionPath) {
            const collecionRef = db.collection(collectionPath);
            let docRef = collecionRef.doc(item.id);

            return docRef.set(item);
        }

        controller.postOne(req, res, next, postFunction, null);
    }
    
    
    function updateOne(req, res, next) {
        function updateFunction(item, collectionPath) {
            const collecionRef = db.collection(collectionPath);
            let docRef = collecionRef.doc(item.id);

            return docRef.set(item, {merge: true});  //do not overwrite entire document
        }

        controller.updateOne(req, res, next, updateFunction, null);
    }
    
    
    function deleteOne(req, res, next) {
        function deleteFunction(id, collectionPath) {
            const collecionRef = db.collection(collectionPath);
            let docRef = collecionRef.doc(id);

            return docRef.delete();
        }
         
        controller.deleteOne(req, res, next, deleteFunction, null);
    }
    
    
    return {
        getAll,
        getById,
        postOne,
        updateOne,
        deleteOne
    }
}


module.exports = defaultService;
