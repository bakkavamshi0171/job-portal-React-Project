import Carousel from 'react-bootstrap/Carousel';
import TopCompanies from "../../assets/Topcompany.jpg";
import Support from "../../assets/customerservice.jpg";
import FastGrow from "../../assets/hrs.avif";
import "./carouselStyles.css";

function DarkVariantExample() {
  return (
    <div className="carousel-container">
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={FastGrow} alt="Fast Response" />
          <div className="carousel-overlay"></div>
          <Carousel.Caption className="carousel-caption">
            <h5>Fast Response From HR's</h5>
            <p>
              Experience swift and efficient communication with HR professionals. Our system ensures prompt responses to your inquiries, keeping you informed and engaged throughout the hiring process.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={Support} alt="Support" />
          <div className="carousel-overlay"></div>
          <Carousel.Caption className="carousel-caption">
            <h5>Always to Support</h5>
            <p>
              Our platform is designed to provide unwavering support for job seekers and employers alike. Whether you're exploring career opportunities or looking to fill critical positions, we’re here to guide you every step of the way.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={TopCompanies} alt="Top Companies" />
          <div className="carousel-overlay"></div>
          <Carousel.Caption className="carousel-caption">
            <h5>Recent Top Hiring Companies</h5>
            <p>
              Stay updated with the latest opportunities from leading companies actively hiring. Discover top employers across various industries and take the next step in your career with confidence.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default DarkVariantExample;
