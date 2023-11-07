const Course = require("../models/course");

// Create Course
const createCourse = async (req, res) => {
    const { title, description, instructor, duration, availableSlots } =
        req.body;

    try {
        const course = await Course.create({
            title,
            description,
            instructor,
            duration,
            availableSlots,
        });
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        res.status(200).json({
            count: courses.length,
            courses,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Course
const getCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById({ _id: id });
        if (!course) return res.status(404).json({ error: "No course found" });

        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Course
const updateCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByIdAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!course) {
            return res.status(404).json({
                error: "No matching course found",
            });
        }

        res.status(200).json({
            message: "The course has been successfully updated.",
            course,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByIdAndDelete({ _id: id });

        if (!course) {
            return res.status(404).json({
                error: "No matching course found",
            });
        }

        res.status(200).json({
            message: "The course has been successfully removed.",
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourse,
    updateCourse,
    deleteCourse,
};
