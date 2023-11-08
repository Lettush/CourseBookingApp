import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        fetch("/api/courses/")
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                setCourses(data.courses);
            })
            .catch((error) => console.log(error));

        const storedUser = localStorage.getItem("username");
        if (storedUser) setUser(storedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    };

    return (
        <div>
            <ul>
                <li>
                    <h3>Welcome {user} </h3>
                </li>
                <li>
                    <Link to="/login" onClick={handleLogout}>
                        <button>Log out</button>
                    </Link>
                </li>
            </ul>
            <h1>Course List</h1>

            {courses &&
                courses.map((course) => (
                    <ul key={course._id}>
                        <li>{course.title}</li>
                        <li>{course.description}</li>
                        <li>{course.instructor}</li>
                        <li>{course.duration}</li>
                        <li>{course.availableSlots}</li>
                        <hr />
                    </ul>
                ))}
        </div>
    );
};

export default CourseList;
