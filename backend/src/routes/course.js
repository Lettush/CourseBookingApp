const express = require("express");
const router = express.Router();
const {
    createCourse,
    getAllCourses,
    getCourse,
    updateCourse,
    deleteCourse,
} = require("../controllers/course");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourse);
router.patch("/:id", authMiddleware, updateCourse);
router.delete("/:id", authMiddleware, deleteCourse);

module.exports = router;
