
const promiseHandler = require('./promise.handlers')();

function requestHandler() {

    function getAll(req, res, next) {

        const collection = req.params.collection;
        //const populateCollections = req.query.populate || null;
        const queryCriteria = req.query.queryCriteria ? JSON.parse(req.query.queryCriteria) : null;
        const selectFields = req.query.fields;
        const sortCriteria = req.query.sort;
        const limitResults = req.query.limit ? parseInt(req.query.limit) : null;

        return {
            collectionPath: collection,
            queryCriteria: queryCriteria,
            selectFields: selectFields,
            sortCriteria: sortCriteria,
            limitResults: limitResults
        }
    }


    function getById(req, res, next) {

        const id = req.params.id;
        const collectionPath = req.params.collection;
        //const populateCollections = req.query.populate || null;
        const selectFields = req.query.fields;

        return {
            id: id,
            collectionPath: collectionPath,
            selectFields: selectFields,
            selectFields: selectFields
        }
    }


    function postOne(req, res, next) {

        // if there is constructed object from previous step, use the constructed object
        //  otherwise default to req.body info (object will be constructed from req.body and saved)
        const collectionPath = req.params.collection;
        const item = req.newItem || req.body;

        return {
            collectionPath: collectionPath,
            item: item
        }
    }


    function updateOne(req, res, next) {
        const collectionPath = req.params.collection;
        const id = req.params.id;
        let updatedProps = req.body;

        //do not allow updates on object id ( _id ) field!
        if (updatedProps["_id"]) {
            delete updatedProps["_id"];
        }
        updatedProps.id = id;

        return {
            collectionPath: collectionPath,
            updatedProps: updatedProps
        }
    }

    function deleteOne(req, res, next) {
        const collectionPath = req.params.collection;
        const id = req.params.id;

        return {
            id: id,
            collectionPath: collectionPath,
        }
    }

    return {
        getAll,
        getById,
        postOne,
        updateOne,
        deleteOne
    }
}

module.exports = requestHandler;
