// src/client/components/blog/blogpost/index.jsx
import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const BlogPost = ({ title, author, date, content, image, categories, tags }) => {
    return (
        <div className="blog-post">
            <div className="blog-image">
                <Link to="#">
                    <img className="img-fluid" src={image} alt={title} />
                </Link>
            </div>
            <h3 className="blog-title">
                <Link to="#">{title}</Link>
            </h3>
            <div className="blog-info clearfix">
                <div className="post-left">
                    <ul>
                        <li>
                            <div className="post-author">
                                <Link to={`/patient/doctor-profile/${author.id}`}>
                                    {/* <img src={author.image} alt={author.name} /> */}
                                    <span>{author.name}</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <i className="far fa-calendar"></i>
                            {date}
                        </li>
                        <li>
                            <i className="fa fa-tags"></i>
                            {categories.join(", ")}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="blog-content">
                <p>{content}</p>
            </div>
            <div className="blog-tags">
                {tags.map((tag, index) => (
                    <Link key={index} to={`/blog/tag/${tag}`} className="tag">
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    )
}

BlogPost.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default BlogPost
