import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions"
import { toast } from "react-toastify";
function ManageCoursePage(props) {
    const [errors, setErrors] = useState({});
    const [courses, setCourses] = useState(courseStore.GetCourses());
    const [course, setCourse] = useState({
        id: null,
        slug: "",
        authorId: null,
        title: "",
        category: ""
    })
    useEffect(() => {
        courseStore.addChangeListener(onChange);
        const slug = props.match.params.slug; // from the path `/courses/:slug`
        if (courses.length === 0) {
            courseActions.loadCourses();
        } else if (slug) {
            setCourse(courseStore.GetCourseBySlug(slug));
        }
        return () => courseStore.removeChangeListener(onChange);
    }, [courses.length, props.match.params.slug]);

    function onChange() {
        setCourses(courseStore.GetCourses());
    }
    function handleChange({ target }) {
        const updatedValue = {
            ...course,
            [target.name]: target.value
        };
        setCourse(updatedValue);
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        courseActions.saveCourse(course)
            .then(() => {
                props.history.push("/courses");
                toast.success(course.id ? "course updated" : "course saved");
            });
    }

    function formIsValid() {
        debugger;
        const tmpError = {};
        if (!course.title) tmpError.title = "Titre is required";
        if (!course.authorId) tmpError.authorId = "authorId is required";
        if (!course.category) tmpError.category = "category is required";
        setErrors(tmpError);
        return Object.keys(tmpError).length === 0;
    }

    return <>
        <h2> Manage Course </h2>
        <CourseForm course={course} errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    </>
}

export default ManageCoursePage;