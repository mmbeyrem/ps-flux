import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import * as authorApi from "../api/authorApi";
import actionTypes from "./actionTypes";

export function saveCourse(course) {
    delete course.authorName;
    return courseApi.saveCourse(course).then(savedCourse =>

        dispatcher.dispatch({
            actionType: course.id ? actionTypes.updateCourse : actionTypes.createCourse,
            course: savedCourse
        })
    );
}
export function deleteCourse(courseId) {
    return courseApi.deleteCourse(courseId).then(() =>

        dispatcher.dispatch({
            actionType: actionTypes.deleteCourse,
            courseId
        })
    );
}

export function loadCourses() {
    return courseApi.getCourses().then(courses =>
        authorApi.getAuthors().then(
            authors => {
                dispatcher.dispatch({
                    actionType: actionTypes.loadCourse,
                    courses,
                    authors
                });
            })
    );
}