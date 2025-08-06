import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./Host.css"

function EditEvent() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [coverImage, setCoverImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)

    const [eventId, setEventId] = useState(null)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        capacity: "",
        organiser: "",
        reg_start_date: "",
        reg_end_date: "",
        price: "",
        categories: []
    })

    const categoriesList = [
        "Academics", "Culture", "Sports", "Social", "Tech", "Career",
        "Awareness", "Festivals", "Community", "Competitions", "Workshops",
        "Events", "InterCollege", "Clubs"
    ]

    useEffect(() => {
        console.log("EditEvent mounted, id:", id)
        if (id) {
            fetch(`http://localhost:3000/organizer/editevent/${id}`)
                .then(async res => {
                    const contentType = res.headers.get("content-type")
                    if (!res.ok || !contentType.includes("application/json")) {
                        throw new Error("Invalid response or not found")
                    }
                    return res.json()
                })
                .then(data => {
                    console.log("Fetched event data:", data)
                    const fmt = (d) => d ? new Date(d).toISOString().split('T')[0] : ""
                    setFormData({
                        title: data.title || "",
                        description: data.description || "",
                        date: fmt(data.date),
                        time: data.time || "",
                        venue: data.venue || "",
                        capacity: data.capacity || "",
                        organiser: data.organiser || "",
                        reg_start_date: fmt(data.reg_start_date),
                        reg_end_date: fmt(data.reg_end_date),
                        price: data.price || "",
                        categories: data.categories || []
                    })
                    setEventId(data.event_id)
                    setPreviewImage(data.cover_image || null)
                })
                .catch(err => console.error("Failed to fetch event", err))
        }
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target
        setFormData(prev => {
            const updatedCategories = checked
                ? [...prev.categories, value]
                : prev.categories.filter(c => c !== value)
            return { ...prev, categories: updatedCategories }
        })
    }

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            console.log("Selected image:", file)
            setCoverImage(file)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    const handleRemoveCoverImage = () => {
        setCoverImage(null)
        setPreviewImage(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const body = new FormData()
        body.append("event_id", eventId)
        for (let key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach((val) => body.append(`${key}[]`, val))
            } else {
                body.append(key, formData[key])
            }
        }
        if (coverImage) {
            body.append("cover_image", coverImage)
        }

        console.log("Submitting with data:")
        for (let pair of body.entries()) {
            console.log(pair[0] + ":", pair[1])
        }

        try {
            const response = await fetch("http://localhost:3000/events/update", {
                method: "PUT",
                body
            })

            const result = await response.json()
            console.log("Server response:", result)

            if (response.ok) {
                alert("Event updated successfully")
                navigate("/organizer/home")
            } else {
                alert("Error: " + result.error)
            }
        } catch (err) {
            console.error("Failed to submit:", err)
        }
    }

    return (
        <div className="host Main">
            <form onSubmit={handleSubmit} className="host-form" encType="multipart/form-data">
                <h2 className="head-text">Edit Event Details:</h2>
                <table><tbody>
                    <tr><td>Event Title:</td><td><input type="text" name="title" value={formData.title} onChange={handleChange} required /></td></tr>
                    <tr><td>Description:</td><td><textarea name="description" value={formData.description} onChange={handleChange} required /></td></tr>
                    <tr><td>Date:</td><td><input type="date" name="date" value={formData.date} onChange={handleChange} required /></td></tr>
                    <tr><td>Time:</td><td><input type="time" name="time" value={formData.time} onChange={handleChange} required /></td></tr>
                    <tr><td>Venue:</td><td><input type="text" name="venue" value={formData.venue} onChange={handleChange} required /></td></tr>
                    <tr><td>Capacity:</td><td><input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required /></td></tr>
                    <tr><td>Registration Start Date:</td><td><input type="date" name="reg_start_date" value={formData.reg_start_date} onChange={handleChange} required /></td></tr>
                    <tr><td>Registration End Date:</td><td><input type="date" name="reg_end_date" value={formData.reg_end_date} onChange={handleChange} required /></td></tr>
                    <tr><td>Price:</td><td><input type="number" name="price" value={formData.price} onChange={handleChange} required /></td></tr>
                    <tr><td>Category:</td><td><div className="categories">
                        {categoriesList.map((category, index) => (
                            <div key={index} className="each-category">
                                <input type="checkbox" id={`cat-${index}`} value={category} className="check"
                                    checked={formData.categories.includes(category)} onChange={handleCategoryChange} />
                                <label htmlFor={`cat-${index}`}>{category}</label>
                            </div>
                        ))}
                    </div></td></tr>
                    <tr><td>Cover Image:</td><td>
                        {previewImage && (
                            <div className="preview-section">
                                <img src={previewImage} alt="Preview" height="120" />
                                <button type="button" onClick={handleRemoveCoverImage}>Remove</button>
                            </div>
                        )}
                        <input type="file" accept="image/*" onChange={handleCoverImageChange} />
                    </td></tr>
                </tbody></table>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditEvent
