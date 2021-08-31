const express = require("express");
const router = express.Router();

const controller = require("../services/controller.service")();

router.get("/:collection/collections", (req, res, next) => {
    controller.getAll(req, res, next);
});


router.get("/:collection", (req, res, next) => {
    controller.getAll(req, res, next);
});


router.get("/:collection/:id", (req, res, next) => {
    controller.getById(req, res, next);
});


router.post("/:collection", (req, res, next) => {
    controller.postOne(req, res, next);
});


router.patch("/:collection/:id", (req, res, next) => {
    controller.updateOne(req, res, next);
});


router.delete("/:collection/:id", (req, res, next) => {
    controller.deleteOne(req, res, next);
});


module.exports = router;
