// db has been initialized in app object and should be cached after the first call

function controller() {

    const dataService = require("./data.service")();
    const requestHandler = require("./request.handlers")();
    const promiseHandler = require("./promise.handlers")();

    
    function getAllCollections(req, res, next) {
        const { collectionPath, queryCriteria, selectFields, sortCriteria, limitResults } = requestHandler.getAll(req, res, next);

        promiseHandler.readPromiseHandler(
            dataService.getAllCollections(collectionPath, selectFields, queryCriteria, sortCriteria, limitResults),
            res
        );
    }


    function getAll(req, res, next) {
        
        const {collectionPath, queryCriteria, selectFields, sortCriteria, limitResults} = requestHandler.getAll(req, res, next);

        promiseHandler.readPromiseHandler(
            dataService.getAll(collectionPath, selectFields, queryCriteria, sortCriteria, limitResults),
            res
        );
    }


    function getById(req, res, next) {

        const { id, collectionPath, selectFields } = requestHandler.getById(req, res, next);

        promiseHandler.readPromiseHandler(
            dataService.getById(id, collectionPath, selectFields),
            res
        );
    }


    function postOne(req, res, next) {
        
        const {  collectionPath, item } = requestHandler.postOne(req, res, next);

        promiseHandler.postPromiseHandler(
            dataService.postOne(item, collectionPath),
            res
        );
    }


    function updateOne(req, res, next) {

        const { collectionPath, updatedProps } = requestHandler.updateOne(req, res, next);

        promiseHandler.updatePromiseHandler(
            dataService.updateOne(updatedProps, collectionPath),
            res
        );
    }


    function deleteOne(req, res, next) {

        const { id, collectionPath } = requestHandler.deleteOne(req, res, next);

        promiseHandler.deletePromiseHandler(
            dataService.deleteOne(id, collectionPath),
            res
        );
    }


    return {
        getAll,
        getById,
        postOne,
        updateOne,
        deleteOne
    }
}


module.exports = controller;

