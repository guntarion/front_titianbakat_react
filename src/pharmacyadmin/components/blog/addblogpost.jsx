// src/pharmacyadmin/components/blog/addblogpost.jsx
import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import SidebarNav from "../sidebar"
import FeatherIcon from "feather-icons-react"
import SelectField from "../commoncomponent/selectfield"
import axios from "axios"
import config from "../../../config"

const AddBlogPost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const [image, setImage] = useState(null)
    const [error, setError] = useState("")
    const [seriesName, setSeriesName] = useState("")
    const [seriesNumber, setSeriesNumber] = useState("")
    const [postWeight, setPostWeight] = useState("")
    const [postType, setPostType] = useState("")

    const categoryOptions = [
        { label: "Category", value: "" },
        { label: "Karir", value: "Karir" },
        { label: "Pembelajaran", value: "Pembelajaran" },
        { label: "Produktivitas", value: "Produktivitas" },
        // Add more categories as needed
    ]

    const handleImageChange = e => {
        setImage(e.target.files[0])
    }

    const createSlug = title => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setError("")

        const formData = new FormData()
        formData.append("title", title)
        formData.append("content", content)
        formData.append("category", category.value)
        formData.append("tags", tags)
        formData.append("slug", createSlug(title))
        formData.append("series_name", seriesName)
        formData.append("series_number", seriesNumber)
        formData.append("post_weight", postWeight)
        formData.append("post_type", postType)
        if (image) {
            formData.append("image", image)
        }

        try {
            const response = await axios.post(`${config.API_URL}/blog/blogposts/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            if (response.data) {
                alert("Blog post created successfully!")
                history.push("/pharmacyadmin/list-blogpost") // Redirect to blog list page
            }
        } catch (err) {
            setError("Error creating blog post. Please try again.")
            alert("Error creating blog post. Please try again.")
            console.error("Error creating blog post:", err)
        }
    }

    return (
        <>
            <SidebarNav />
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">Add Blog Post</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/pharmacyadmin">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Add Blog Post</li>
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
                                            <SelectField
                                                options={categoryOptions}
                                                value={category}
                                                onChange={selectedOption => setCategory(selectedOption)}
                                                placeholder="Select Category"
                                            />
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
                                            <label>Blog Image</label>
                                            <div className="change-photo-btn">
                                                <div>
                                                    <FeatherIcon icon="upload" />
                                                    <p>Upload File</p>
                                                </div>
                                                <input type="file" className="upload" onChange={handleImageChange} />
                                            </div>
                                            <small className="form-text text-muted">Allowed file types: jpg, jpeg, png. Max file size: 2MB</small>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">
                                                Create Blog Post
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

export default AddBlogPost
