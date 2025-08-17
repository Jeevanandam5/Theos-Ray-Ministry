import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createSubject } from '@/api/api'

const AdminPage = () => {
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
    videoUrl: "",
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData({ ...formData, image: files[0] }); // store actual file
      setPreview(URL.createObjectURL(files[0])); // preview separately
    } if (name === "pdf" && files.length > 0) {
      setFormData({ ...formData, pdf: files[0] });
    }

    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", formData.image);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("videoUrl", formData.videoUrl);
    data.append("pdf", formData.pdf);

    try {
      await createSubject(data);
      alert("✅ Content Added Successfully!");
      setFormData({ image: null, title: "", description: "", videoUrl: "" });
      setPreview("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add content");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0f1f] to-black text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 animate-fadeIn">
        Admin <span className="text-primary">Dashboard</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#1e1e2f] p-6 rounded-xl shadow-lg space-y-5 animate-slideUp"
      >
        {/* Image Upload */}
        <div>
          <label className="block text-sm mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-600 bg-transparent p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-full h-64 md:h-80 object-cover rounded-lg border border-gray-700 transition-transform duration-500 hover:scale-105"
            />
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full border border-gray-600 bg-transparent p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows="4"
            className="w-full border border-gray-600 bg-transparent p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          ></textarea>
        </div>

        {/* YouTube Link */}
        <div>
          <label className="block text-sm mb-1">YouTube Link</label>
          <input
            type="url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full border border-gray-600 bg-transparent p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block text-sm mb-1">Upload PDF</label>
          <input
            type="file"
            name="pdf"
            accept="application/pdf"
            onChange={handleChange}
            className="w-full border border-gray-600 bg-transparent p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
        </div>


        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition transform hover:scale-105">
          Add Subject
        </button>
      </form>

      <Link to="/" className="mt-6">
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
          ⬅ Back to Home
        </button>
      </Link>
    </div>
  );
};

export default AdminPage;
