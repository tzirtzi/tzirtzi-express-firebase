
function promiseHandler() {
    
    function readPromiseHandler(dbcallPromise, res) {
        dbcallPromise
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }

    function postPromiseHandler(dbcallPromise, res) {
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

    function updatePromiseHandler(dbcallPromise, res) {
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

    function deletePromiseHandler(dbcallPromise, res) {
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

    return {
        readPromiseHandler,
        postPromiseHandler,
        updatePromiseHandler,
        deletePromiseHandler
    }

}

module.exports = promiseHandler;
