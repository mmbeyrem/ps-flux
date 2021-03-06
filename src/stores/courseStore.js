import { EventEmitter } from "events";
import dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";
const CHANGE_EVENT = "change";
let _courses = [];
let _authors = [];
class CourseStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
    emitChange() {
        this.emit(CHANGE_EVENT);
    }
    GetCourses() {
        return _courses;
    }
    GetAuthors() {
        return _authors;
    }
    GetCourseBySlug(slug) {
        return _courses.find(c => c.slug === slug);
    }
}
const store = new CourseStore();
dispatcher.register(action => {
    switch (action.actionType) {
        case actionTypes.createCourse:
            console.log(actionTypes.createCourse);
            _courses.push(action.course);
            store.emitChange();
            break;
        case actionTypes.updateCourse:
            action.course.authorName = _authors.find(a => a.id === action.course.authorId).name;
            _courses = _courses.map(c => c.id === action.course.id ? action.course : c);
            store.emitChange();
            break;
        case actionTypes.loadCourse:
            _authors = action.authors;
            _courses = action.courses
                .map(c => ({ ...c, authorName: action.authors.find(a => a.id === c.authorId).name }));
            store.emitChange();
            break;
        case actionTypes.deleteCourse:
            _courses = _courses.filter(c => c.id !== parseInt(action.courseId, 10));
            store.emitChange();
            break;
        default:
            break;
    }

})
export default store;