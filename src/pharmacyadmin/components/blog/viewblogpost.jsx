// src/pharmacyadmin/components/blog/viewblogpost.jsx
import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import SidebarNav from "../sidebar"
import config from "../../../config"
import "./viewblogpost.css"

const ViewBlogPost = () => {
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        fetchBlogPost()
    }, [])

    const fetchBlogPost = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/blog/blogposts/${id}`)
            setBlog(response.data)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching blog post:", error)
            setLoading(false)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!blog) {
        return <div>Blog post not found</div>
    }

    return (
        <>
            <SidebarNav />
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">View Blog Post</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/pharmacyadmin">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/pharmacyadmin/list-blogpost">Blog List</Link>
                                    </li>
                                    <li className="breadcrumb-item active">View Blog Post</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="blog-view">
                                        <h2>{blog.title}</h2>
                                        <div className="blog-info">
                                            <span>
                                                <i className="fa fa-calendar"></i> {new Date(blog.created_at).toLocaleDateString()}
                                            </span>
                                            <span>
                                                <i className="fa fa-user"></i> {blog.author}
                                            </span>
                                            <span>
                                                <i className="fa fa-tag"></i> {blog.category}
                                            </span>
                                        </div>
                                        {blog.image && (
                                            <div className="blog-image">
                                                <img src={blog.image} alt={blog.title} className="img-fluid" />
                                            </div>
                                        )}
                                        <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                                        <div className="blog-tags">
                                            {blog.tags.map((tag, index) => (
                                                <span key={index} className="badge badge-primary mr-1">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Comments</h4>
                                    {blog.comments && blog.comments.length > 0 ? (
                                        <ul className="comments-list">
                                            {blog.comments.map((comment, index) => (
                                                <li key={index}>
                                                    <div className="comment">
                                                        <div className="comment-author">
                                                            <img className="avatar" alt="" src={comment.avatar || "default-avatar.png"} />
                                                        </div>
                                                        <div className="comment-block">
                                                            <span className="comment-by">
                                                                <span className="blog-author-name">{comment.author}</span>
                                                            </span>
                                                            <p>{comment.content}</p>
                                                            <p className="blog-date">{new Date(comment.date).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No comments yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewBlogPost
