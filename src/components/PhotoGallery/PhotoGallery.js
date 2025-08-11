import React, { useState, useEffect } from "react";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Gallery1 from "../../assets/images/Gallery1.jpeg";
import Band from "../../assets/images/Band.jpeg";
import Us from "../../assets/images/Us.jpeg";
import Harvard from "../../assets/images/Harvard.jpeg";
import FirstTime from "../../assets/images/FirstTime.jpeg";
import NewButOld from "../../assets/images/NewButOld.jpeg";
import Work from "../../assets/images/Work.jpeg";
import MinecraftProm from "../../assets/images/MinecraftProm.jpeg";
import Debate2 from "../../assets/images/Debate2.jpeg";
import DebateHorror from "../../assets/images/DebateHorror.jpeg";
import Valentines from "../../assets/images/Valentines.jpeg";
// Photos array
const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "My Love",
    date: "Nov 11, 2024",
  },
  {
    id: 2,
    src: FirstTime,
    caption: "First Time Meeting",
    date: "June 8, 2024",
  },
  {
    id: 3,
    src: Harvard,
    caption: "Harvard Fanatics",
    date: "Feb 17, 2025",
  },

  {
    id: 4,
    src: Gallery1,
    caption: "Harvard Fanatics Pt. 2!",
    date: "Feb 16, 2025",
  },

{
  id: 5,
  src: Band,
  caption: "Band Concert!",
  date: "Jan 29, 2025",
},

{
  id: 6,
  src: Valentines,
  caption: "Valentines Day!",
  date: "Feb 13, 2025",
},
{
  id: 7,
  src: NewButOld,
  caption: "New but Old",
  date: "June 6, 2025",
},
{
  id: 8,
  src: Work,
  caption: "Work!",
  date: "Aug 7, 2025",
},
{
  id: 9,
  src: MinecraftProm,
  caption: "Best Promposal!",
  date: "Apr 20, 2025",
},
{
  id: 10,
  src: DebateHorror,
  caption: "Debate Horror",
  date: "Jan 25, 2025",
},
{
  id: 11,
  src: Debate2,
  caption: "More Debate!",
  date: "Feb 15, 2025",
},
];

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = (direction) => {
    if (direction === "prev") {
      setCurrentIndex((prev) =>
        prev === 0 ? photos.length - 1 : prev - 1
      );
    } else {
      setCurrentIndex((prev) =>
        prev === photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Auto slide every 5s
  //useEffect(() => {
   // const timer = setInterval(() => {
   //   setCurrentIndex((prev) =>
     //   prev === photos.length - 1 ? 0 : prev + 1
    //  );
   // }, 5000);
   // return () => clearInterval(timer);
  //}, []);

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">
        Our Memories <FaHeart className="heart-icon" />
      </h2>

      <div className="carousel">
        <button className="arrow left" onClick={() => navigate("prev")}>
          <FaChevronLeft />
        </button>

        <div className="slide">
  <div className="image-wrapper">
    <img
      src={photos[currentIndex].src}
      alt={photos[currentIndex].caption}
      onError={(e) => {
        e.target.src =
          "https://via.placeholder.com/800x600?text=Image+Not+Found";
      }}
    />
  </div>
  <div className="caption">
    <h3>{photos[currentIndex].caption}</h3>
    <p>{photos[currentIndex].date}</p>
  </div>
</div>


        <button className="arrow right" onClick={() => navigate("next")}>
          <FaChevronRight />
        </button>
      </div>

      <div className="dots">
        {photos.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>

      {/* CSS */}
      <style jsx>{`
        .gallery-container {
          background: #fff9fb;
          text-align: center;
          padding: 4rem 2rem;
        }

        .gallery-title {
          font-size: 2.5rem;
          color: #ff4d6d;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .heart-icon {
          color: #ff4d6d;
        }

        .carousel {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }

          .image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 500px; /* fixed carousel height */
    background: #f8f8f8; /* optional — nice light background */
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .image-wrapper img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* keeps full image visible */
    display: block;
  }

        .caption {
          margin-top: 1rem;
          color: #333;
        }

        .caption h3 {
          font-size: 1.5rem;
          color: #ff4d6d;
        }

        .caption p {
          font-size: 1rem;
          font-style: italic;
          color: #777;
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: #ff85a2;
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
        }

        .arrow.left {
          left: 10px;
        }

        .arrow.right {
          right: 10px;
        }

        .dots {
          margin-top: 1rem;
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ccc;
          cursor: pointer;
          transition: background 0.3s;
        }

        .dot.active {
          background: #ff4d6d;
        }
      `}</style>
    </div>
  );
};

export default PhotoGallery;
