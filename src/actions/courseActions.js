import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";

export function saveCourse(course) {
    console.log("saveCourse");

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
    return courseApi.getCourses().then(
        courses => {
            dispatcher.dispatch({
                actionType: actionTypes.loadCourse,
                courses
            });
            console.log(`looad ${JSON.stringify(courses)}`);
        }
    );
}