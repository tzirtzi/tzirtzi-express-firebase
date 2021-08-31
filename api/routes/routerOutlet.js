const express = require('express');
const router = express.Router();

    const authGuard = require('../middleware/authGuard');
    const upload = require('../middleware/uploadFileFormidable');

    const statusRoutes = require('./status.routes');
    const uploadRoutes = require('./upload.routes');

    const defaultRoutes = require('./default.routes');

    // Standard routing
    router.use('/api/protected/status', authGuard, statusRoutes);  // Protected Health endpoint
    router.use('/api/status', statusRoutes);   // Public Health endpoint
    router.use('/api/upload', uploadRoutes);

    /// custom routing handled here ///////////////////////
    router.use('/api/data/v1', defaultRoutes);

module.exports = router;
