import React from "react";

const Categories = () => {
  return (
    <div>
      <div className="container mt-5" >
        <div className="row mb-2">
          <h3> Browse via Categories</h3>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div
              className="banner_item align-items-center"
              style={{ backgroundImage: 'url("/images/carouselpic.jpg")' }}
            >
              <div class="banner_category">
                <a href="categories.html">women's</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="banner_item align-items-center"
              style={{ backgroundImage: 'url("/images/carouselpic.jpg")' }}
            >
              <div class="banner_category">
                <a href="categories.html">women's</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="banner_item align-items-center"
              style={{ backgroundImage: 'url("/images/carouselpic.jpg")' }}
            >
              <div class="banner_category">
                <a href="categories.html">women's</a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Categories;
