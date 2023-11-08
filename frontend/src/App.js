import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import CourseList from "./components/course/CourseList";
import Navbar from "./components/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CourseForm from "./components/course/CourseForm";

const getToken = () => {
    return localStorage.getItem("token");
};

function App() {
    const token = getToken();
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            token ? <CourseList /> : <Navigate to="/login" />
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/create-course"
                        element={
                            token ? <CourseForm /> : <Navigate to="/login" />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
