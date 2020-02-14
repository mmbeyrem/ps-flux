import React from "react";
import TextInput from "./common/TextInput";
function CourseForm(props) {
    return (
        <form onSubmit={props.onSubmit} >
            <TextInput
                id="title"
                label="title"
                name="title"
                value={props.course.title}
                onChange={props.onChange}
                error={props.errors.title}
            />

            <div className="form-group">
                <label htmlFor="author">Author</label>
                <div className="field">
                    <select
                        id="author"
                        name="authorId"
                        value={props.course.authorId || ""}
                        onChange={props.onChange}
                        className="form-control"
                    >
                        <option value="" />
                        <option value="1">Cory House</option>
                        <option value="2">Scott Allen</option>
                    </select>
                </div>
                {props.errors.authorId && (
                    <div className="alert alert-danger"> {props.errors.authorId}</div>
                )}
            </div>

            <TextInput
                type="text"
                id="category"
                lavel="category"
                name="category"
                onChange={props.onChange}
                className="form-control"
                value={props.course.category}
                error={props.errors.category}
            />
            <input type="submit" value="Save" className="btn btn-primary" />
        </form >
    );
}

export default CourseForm;
