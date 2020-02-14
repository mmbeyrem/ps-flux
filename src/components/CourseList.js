import React from 'react'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function CourseList(props) {

    return (
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>Titre</th>
                    <th>Author ID</th>
                    <th>Category</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {props.courses
                    .map(c => <tr key={c.id}>
                        <td><Link to={"/course/" + c.slug} >{c.title}</Link></td>
                        <td>{c.authorId}</td>
                        <td>{c.category}</td>
                        <td> <button className="btn btn-danger"
                            onClick={() => props.DeleteHandler(c.id)}  > X</button> </td>
                    </tr>)}
            </tbody>
        </table >)
}

CourseList.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        authorId: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
    })).isRequired
}
export default CourseList;
