import React from "react";

const Carousel = () => {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/carouselpic.jpg" className="d-block w-100 carousel-img" alt="..." />
            <div className="carousel-caption-f d-md-block">
              <div className="carousel-caption-content">
                <h2>GET THE BEST FASHION OUTFITS</h2>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/images/carouselpic2.jpg" className="d-block w-100 carousel-img" alt="..." />
            <div className="carousel-caption-f d-md-block">
              <div className="carousel-caption-content">
                <h2>COMPLETE PERSONALISED RECOMMENDATIONS</h2>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/images/carouselpic3.jpg" className="d-block w-100 carousel-img" alt="..." />
            <div className="carousel-caption-f d-md-block">
              <div className="carousel-caption-content">
                <h2>CATERING TO EVERYONE'S INDIVIDUAL NEEDS</h2>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
