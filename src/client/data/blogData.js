// src/client/data/blogData.js
import { IMG01, IMG02, IMG03 } from "../components/blog/bloglist/img.jsx"

export const blogPosts = [
    {
        id: "1",
        title: "Doccure – Making your clinic painless visit?",
        author: {
            id: "1",
            name: "Dr. Ruby Perrin",
            image: "path_to_author_image",
        },
        date: "4 Dec 2019",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        image: IMG01,
        categories: ["Health Tips"],
        tags: ["Children", "Health", "Clinic"],
    },
    {
        id: "2",
        title: "Example Writing?",
        author: {
            id: "1",
            name: "Guntar",
            image: "path_to_author_image",
        },
        date: "4 Dec 2019",
        content: "Entrypoint main 32.2 MiB (23.8 MiB) = 123456 Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        image: IMG01,
        categories: ["Health Tips"],
        tags: ["Improvement", "Health", "Power"],
    },
    // Add more blog posts here
]

export const getPostById = id => {
    return blogPosts.find(post => post.id === id)
}
