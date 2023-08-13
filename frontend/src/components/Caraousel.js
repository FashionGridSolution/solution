import React from "react";

const Caraousel = () => {
  return (
    <div>
      {/* style={{backgroundImage: 'url("/images/carouselpic2.jpg")'}} */}
      <div class="carousel slide">
        <ol class="carousel-indicators">
          <li></li> <li></li> <li class="active"></li>{" "}
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item">
            <div
              class="d-block w-100 main_slider"
              style={{ backgroundImage: 'url("/images/carouselpic.jpg")' }}
            >
              <div class="container fill_height">
                <div class="row align-items-center fill_height">
                  <div class="col">
                    <div
                      class="main_slider_content aos-init aos-animate"
                      data-aos="fade-right"
                    >
                      <h6>Spring / Summer Collection 2017</h6>
                      <h1>Get up to 30% Off New Arrivals</h1>
                      <div class="red_button shop_now_button">
                        <a href="#">shop now</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="d-block w-100 main_slider">
              <div class="container fill_height">
                <div class="row align-items-center fill_height">
                  <div class="col">
                    <div
                      class="main_slider_content aos-init aos-animate"
                      data-aos="fade-right"
                    >
                      <h6>Spring / Summer Collection 2017</h6>
                      <h1>Get up to 30% Off New Arrivals</h1>
                      <div class="red_button shop_now_button">
                        <a href="#">shop now</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="active carousel-item">
            <div
              class="d-block w-100 main_slider"
              style={{ backgroundImage: 'url("/images/carouselpic3.jpg")' }}
            >
              <div class="container fill_height">
                <div class="row align-items-center fill_height">
                  <div class="col">
                    <div
                      class="main_slider_content aos-init aos-animate"
                      data-aos="fade-right"
                    >
                      <h6>Spring / Summer Collection 2017</h6>
                      <h1>Get up to 30% Off New Arrivals</h1>
                      <div class="red_button shop_now_button">
                        <a href="#">shop now</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" role="button" href="#">
          <span aria-hidden="true" class="carousel-control-prev-icon"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" role="button" href="#">
          <span aria-hidden="true" class="carousel-control-next-icon"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Caraousel;
