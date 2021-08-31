const express = require("express");
const router = express.Router();

const defaultService = require("../services/default.service")();

router.get("/:collection", (req, res, next) => {
    defaultService.getAll(req, res, next);
    // res.status(200).json(
    //     req.userData ? { userdata: req.userData } : 'ok41234'
    // );
});


router.get("/:collection/:id", (req, res, next) => {
    defaultService.getById(req, res, next);
});


router.post("/:collection", (req, res, next) => {
    defaultService.postOne(req, res, next);
});


router.patch("/:collection/:id", (req, res, next) => {
    defaultService.updateOne(req, res, next);
});


router.delete("/:collection/:id", (req, res, next) => {
    defaultService.deleteOne(req, res, next);
});


module.exports = router;
