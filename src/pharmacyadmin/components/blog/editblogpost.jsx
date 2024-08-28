// src/pharmacyadmin/components/blog/editblogpost.jsx
import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"
import SidebarNav from "../sidebar"
import config from "../../../config"

const EditBlogPost = () => {
    const { id } = useParams()
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const [status, setStatus] = useState("")
    const [image, setImage] = useState(null)
    const [currentImage, setCurrentImage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [seriesName, setSeriesName] = useState("")
    const [seriesNumber, setSeriesNumber] = useState("")
    const [postWeight, setPostWeight] = useState("")
    const [postType, setPostType] = useState("")

    useEffect(() => {
        fetchBlogPost()
    }, [])

    const fetchBlogPost = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/blog/blogposts/${id}`)
            const post = response.data
            setTitle(post.title)
            setContent(post.content)
            setCategory(post.category)
            setTags(post.tags.join(", "))
            setStatus(post.status)
            setCurrentImage(post.image_url)
            setSeriesName(post.series_name || "")
            setSeriesNumber(post.series_number || "")
            setPostWeight(post.post_weight || "")
            setPostType(post.post_type || "")
            setLoading(false)
        } catch (error) {
            console.error("Error fetching blog post:", error)
            setError("Failed to fetch blog post")
            setLoading(false)
        }
    }

    const handleImageChange = e => {
        setImage(e.target.files[0])
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setError("")

        const formData = new FormData()
        formData.append("title", title)
        formData.append("content", content)
        formData.append("category", category)
        formData.append("tags", tags)
        formData.append("status", status)
        formData.append("series_name", seriesName)
        formData.append("series_number", seriesNumber)
        formData.append("post_weight", postWeight)
        formData.append("post_type", postType)
        if (image) {
            formData.append("image", image)
        }

        try {
            await axios.put(`${config.API_URL}/blog/blogposts/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            alert("Blog post updated successfully")
            history.push("/pharmacyadmin/list-blogpost")
        } catch (error) {
            console.error("Error updating blog post:", error)
            setError("Failed to update blog post")
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <SidebarNav />
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">Edit Blog Post</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="/pharmacyadmin">Dashboard</a>
                                    </li>
                                    <li className="breadcrumb-item active">Edit Blog Post</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>
                                                Blog Title <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Category <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" className="form-control" value={category} onChange={e => setCategory(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Series Name</label>
                                            <input type="text" className="form-control" value={seriesName} onChange={e => setSeriesName(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Series Number</label>
                                            <input type="number" className="form-control" value={seriesNumber} onChange={e => setSeriesNumber(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Post Weight</label>
                                            <input type="number" className="form-control" value={postWeight} onChange={e => setPostWeight(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Post Type</label>
                                            <input type="text" className="form-control" value={postType} onChange={e => setPostType(e.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label>
                                                Blog Content <span className="text-danger">*</span>
                                            </label>
                                            <textarea rows="6" className="form-control" value={content} onChange={e => setContent(e.target.value)} required></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label>Tags</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={tags}
                                                onChange={e => setTags(e.target.value)}
                                                placeholder="Enter tags separated by commas"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Current Image</label>
                                            {currentImage && (
                                                <img src={currentImage} alt="Current blog image" style={{ maxWidth: "200px", display: "block", marginBottom: "10px" }} />
                                            )}
                                            <input type="file" className="form-control" onChange={handleImageChange} />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">
                                                Update Blog Post
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditBlogPost
