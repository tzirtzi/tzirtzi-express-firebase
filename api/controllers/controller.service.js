// handles
// a. request inputs 
// b. response promise
function controller() {

    function getAll(req, res, next, dataServiceGetAllFunction, promiseHandler) {

        const collectionPath = req.params.collection;
        //const populateCollections = req.query.populate || null;
        const queryCriteria = req.query.queryCriteria ? JSON.parse(req.query.queryCriteria) : null;
        const selectFields = req.query.fields;
        const sortCriteria = req.query.sort;
        const limitResults = req.query.limit ? parseInt(req.query.limit) : null;

        function controllerPromiseHandler(dbcallPromise) {
            dbcallPromise
                .then(docs => {
                    res.status(200).json(docs);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
        const responseHandler = promiseHandler || controllerPromiseHandler;

        responseHandler(
            dataServiceGetAllFunction(collectionPath, selectFields, queryCriteria, sortCriteria, limitResults)
        );

    }


    function getById(req, res, next, dataServiceGetByIdFunction, promiseHandler) {

        const id = req.params.id;
        const collectionPath = req.params.collection;
        //const populateCollections = req.query.populate || null;
        const selectFields = req.query.fields;

        function controllerPromiseHandler(dbcallPromise) {
            dbcallPromise
                .then(docs => {
                    res.status(200).json(docs);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
        const responseHandler = promiseHandler || controllerPromiseHandler;

        responseHandler(
            dataServiceGetByIdFunction(id, collectionPath, selectFields)
        );
    }


    function postOne(req, res, next, dataServicePostFunction, promiseHandler) {

        // if there is constructed object from previous step, use the constructed object
        //  otherwise default to req.body info (object will be constructed from req.body and saved)
        const collectionPath = req.params.collection;
        const item = req.newItem || req.body;

        function controllerPromiseHandler(dbcallPromise) {
            dbcallPromise
                .then(doc => {
                    console.log(doc);
                    res.status(201).json({
                        message: "Document Created Successfully",
                        created: doc
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
        const responseHandler = promiseHandler || controllerPromiseHandler;

        responseHandler(
            dataServicePostFunction(item, collectionPath)
        );
    }


    function updateOne(req, res, next, dataServiceUpdateFunction, promiseHandler) {
        const collectionPath = req.params.collection;
        const id = req.params.id;
        let updatedProps = req.body;

        //do not allow updates on object id ( _id ) field!
        if (updatedProps["_id"]) {
            delete updatedProps["_id"];
        }
        updatedProps.id = id;

        function controllerPromiseHandler(dbcallPromise) {
            dbcallPromise
                .then(doc => {
                    if (doc) {
                        res.status(200).json({
                            message: 'Document updated',
                            updated: doc
                        });
                    } else {
                        res.status(404).json({ message: "No valid entry found for provided ID" });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
        const responseHandler = promiseHandler || controllerPromiseHandler;

        responseHandler(
            dataServiceUpdateFunction(updatedProps, collectionPath)
        );
    }

    function deleteOne(req, res, next, dataServiceDeleteFunction, promiseHandler) {
        const collectionPath = req.params.collection;
        const id = req.params.id;

        function controllerPromiseHandler(dbcallPromise) {
            dbcallPromise
                .then(doc => {
                    if (doc) {
                        res.status(200).json({
                            message: 'Document deleted',
                            deleted: doc
                        });
                    } else {
                        res.status(404).json({ message: "No valid entry found for provided ID" });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
        const responseHandler = promiseHandler || controllerPromiseHandler;

        responseHandler(
            dataServiceDeleteFunction(id, collectionPath)
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
