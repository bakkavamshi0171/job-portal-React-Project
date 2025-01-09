
import React from "react";
import "./cardCarousal.css";

const CardCarousal = () => {
  return (
    <div className="card-container">
      <h1
        style={{
          fontSize: "35px",
          color: "white",
          textAlign: "center",
          margin:"20px 0px",
          fontWeight: "700",
        }}
      >
        Trending Courses
      </h1>
      <div className="cardCarousal">
        {[
          {
            url: "https://youtu.be/Vi9bxu-M-ag?si=mVIqi_Piyc5aGRMb",
            img: "https://tinyurl.com/4raea8cp",
          },
          {
            url: "https://youtu.be/l1EssrLxt7E?si=HfLMolrq92zsiL7B",
            img: "https://tinyurl.com/349vpkkx",
          },
          {
            url: "https://youtu.be/9He4UBLyk8Y?si=Lv8ZPjUdlUdKRzNw",
            img: "https://tinyurl.com/5d2jkmzm",
          },
          {
            url: "https://youtu.be/VaSjiJMrq24?si=RUYKZkEmBL1J_yHl",
            img: "https://tinyurl.com/4f99pan7",
          },
          {
            url: "https://youtu.be/7wnove7K-ZQ?si=KEfsqaP3lcBPrW0v",
            img: "https://tinyurl.com/u6h5395d",
          },
          {
            url: "https://youtu.be/hQcFE0RD0cQ?si=7BZ9dpxktwynsYrP",
            img: "https://tinyurl.com/d8vzpeax",
          },
        ].map((item, index) => (
          <div className="card" key={index}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img src={item.img} alt={`Course ${index + 1}`} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousal;
