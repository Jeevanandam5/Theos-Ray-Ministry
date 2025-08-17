import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { getSubjects } from "../api/api"; // ✅ import API instead of static assets

const Subject = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);

  // Fetch subjects from DB
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await getSubjects();
        setSubjects(res.data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="px-4 py-6">
      <h1 className="text-lg md:text-2xl font-bold mb-4">Our Subjects</h1>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {subjects.map((item) => (
          <div
            onClick={() =>
              navigate(`/subject/${item._id}`, { state: { selected: item } })
            }
            key={item._id}
            className="min-w-[80%] md:min-w-[300px] snap-center rounded-xl shadow-lg relative group flex-shrink-0"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "200px",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-xl transition group-hover:bg-black/60"></div>

            {/* Content */}
            <div className="absolute bottom-3 left-3 text-white z-10">
              <h2 className="font-bold text-lg line-clamp-1">{item.title}</h2>
              <p className="text-sm opacity-80 line-clamp-2">
                {item.description}
              </p>
              <a
                href={item.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 px-3 py-1 bg-primary rounded-md text-sm hover:bg-primary/90 transition">
                Watch Video
              </a>
            </div>
          </div>
        ))}
      </div>

      {location.pathname === "/subject" && (
        <div>
          <Link to="/" className="block text-center mt-6">
            <button className="px-4 py-2 bg-primary hover:bg-primary/90 transition rounded-lg font-medium text-white shadow-md hover:shadow-lg cursor-pointer">
              Back To Home
            </button>
          </Link>
          <div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Subject;
