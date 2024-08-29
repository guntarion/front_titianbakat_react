// src/pharmacyadmin/components/blog/adminbloglist.jsx

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import SidebarNav from "../sidebar"
import config from "../../../config"
import Pagination from "../commoncomponent/pagination"

const AdminBlogList = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPosts, setTotalPosts] = useState(0)
    const postsPerPage = 20

    useEffect(() => {
        fetchBlogs()
    }, [currentPage]) // Add currentPage as a dependency

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${config.API_URL}/blog/blogposts/?skip=${(currentPage - 1) * postsPerPage}&limit=${postsPerPage}`)
            setBlogs(response.data.posts)
            setTotalPosts(response.data.total)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching blogs:", error)
            alert("Failed to fetch blog posts")
            setLoading(false)
        }
    }

    const handleDelete = async id => {
        if (window.confirm("Are you sure you want to delete this blog post?")) {
            try {
                await axios.delete(`${config.API_URL}/blog/blogposts/${id}`)
                alert("Blog post deleted successfully")
                fetchBlogs()
            } catch (error) {
                console.error("Error deleting blog:", error)
                alert("Failed to delete blog post")
            }
        }
    }

    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
        // fetchBlogs will be called automatically due to the useEffect dependency
    }

    return (
        <>
            <SidebarNav />
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">Blog List</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/pharmacyadmin">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Blog List</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <>
                                            <div className="table-responsive">
                                                <table className="table table-hover table-center mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Title</th>
                                                            <th>Category</th>
                                                            <th>Created At</th>
                                                            <th>Status</th>
                                                            <th>Tags</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {blogs.map(blog => (
                                                            <tr key={blog._id}>
                                                                <td>
                                                                    <Link to={`/pharmacyadmin/view-blogpost/${blog._id}`}>{blog.title}</Link>
                                                                </td>
                                                                <td>{blog.category}</td>
                                                                <td>{new Date(blog.created_at).toLocaleDateString()}</td>
                                                                <td>
                                                                    <span className={`badge badge-pill bg-${blog.status === "active" ? "success" : "danger"}`}>
                                                                        {blog.status.toUpperCase()}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    {blog.tags.map((tag, index) => (
                                                                        <span key={index} className="badge badge-pill bg-primary mr-1">
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </td>
                                                                <td>
                                                                    <div className="actions">
                                                                        <Link to={`/pharmacyadmin/edit-blogpost/${blog._id}`} className="btn btn-sm bg-success-light mr-2">
                                                                            <i className="fe fe-pencil"></i> Edit
                                                                        </Link>
                                                                        <a href="#" className="btn btn-sm bg-danger-light" onClick={() => handleDelete(blog._id)}>
                                                                            <i className="fe fe-trash"></i> Delete
                                                                        </a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={paginate} currentPage={currentPage} />
                                        </>
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

export default AdminBlogList
