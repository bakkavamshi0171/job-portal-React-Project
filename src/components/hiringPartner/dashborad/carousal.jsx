import Carousel from 'react-bootstrap/Carousel';
import TopCompanies from "../../assets/Topcompany.jpg";
import Support from "../../assets/customerservice.jpg";
import FastGrow from "../../assets/hrs.avif"

function DarkVariantExample() {
  return (
    
    <Carousel data-bs-theme="dark">
      <Carousel.Item style={{color:"white"}}>
        <img
          className="d-block w-100"
          src={FastGrow}
          alt="First slide"
        />
        <Carousel.Caption style={{color:"black", fontSize:"x-large", backgroundColor:"white", padding:"10px", borderRadius:"8px"}}>
          <h5 style={{fontWeight:"700"}}>Fast Response From HR's</h5>
          <p>
          Experience swift and efficient communication with HR professionals. Our system ensures prompt responses to your inquiries, keeping you informed and engaged throughout the hiring process.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
        <img
          className="d-block w-100"
          src={Support}
          alt="Second slide"
        />
        <Carousel.Caption style={{color:"black", fontSize:"x-large", backgroundColor:"white", padding:"10px", borderRadius:"8px"}}>
          <h5 style={{fontWeight:"700"}}>Always to Support</h5>
          <p>Our platform is designed to provide unwavering support for job seekers and employers alike. Whether you're exploring career opportunities or looking to fill critical positions, we’re here to guide you every step of the way</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={TopCompanies}
          alt="Third slide"
        />
        <Carousel.Caption style={{color:"black", fontSize:"x-large", backgroundColor:"white", padding:"10px", borderRadius:"8px"}}>
          <h5 style={{fontWeight:"700"}}>Recent Top Hiring Companies</h5>
          <p>
          Stay updated with the latest opportunities from leading companies actively hiring. Discover top employers across various industries and take the next step in your career with confidence.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;