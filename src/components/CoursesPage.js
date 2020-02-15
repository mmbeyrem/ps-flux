import React, { useState, useEffect } from 'react'
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";
function CoursesPage() {
    const [courses, setCourses] = useState(courseStore.GetCourses());

    useEffect(() => {
        courseStore.addChangeListener(onChange);
        if (courseStore.GetCourses().length === 0) {
            loadCourses();
        }
        return () => courseStore.removeChangeListener(onChange);
    }, [courses.length]);

    function onChange() {
        setCourses(courseStore.GetCourses());
    }
    return <> <h2>Courses </h2>
        <div className="container">
            <div className="row">
                <Link to="/course" className="col-sm-2 btn btn-primary" > Add </Link>
            </div>
            <div className="row">
                <CourseList className="col-sm-12" courses={courses} DeleteHandler={deleteCourse} />
            </div>
        </div>
    </>

}

export default CoursesPage;