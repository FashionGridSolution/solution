import React from "react";
import "./FilterBar.css";
const FilterBar = () => {
  return (
    <div id="filterbar" className="collapse show" style={{}}>
      <div className="box border-bottom">
        <div className="form-group text-center">
          <div className="btn-group" data-toggle="buttons">
            <label className="btn btn-success form-check-label">
              <input className="form-check-input" type="radio" /> Reset
            </label>
            <label className="btn btn-success form-check-label active">
              <input
                className="form-check-input"
                type="radio"
                defaultChecked=""
              />
              Apply
            </label>
          </div>
        </div>
        <div>
          <div className="my-1 d-flex tick">
            <div class="input-group-prepend mr-1 ">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </div>
            New
          </div>
          <div className="my-1 d-flex tick">
            <div class="input-group-prepend mr-1 ">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </div>
            Sale
          </div>
          
         
          
        </div>
        
      </div>
      <div className="box border-bottom">
        <div className="box-label text-uppercase d-flex align-items-center">
          Outerwear
          <button
            className="btn ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#inner-box"
            aria-expanded="true"
            aria-controls="inner-box"
            id="out"
            onclick="outerFilter()"
          >
            +
          </button>
        </div>
        <div id="inner-box" className="mt-2 mr-1 collapse show" style={{}}>
          <div className="my-1 d-flex tick">
            <div class="input-group-prepend mr-1 ">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </div>
            Windbreaker
          </div>
          <div className="my-1 d-flex tick">
            <div class="input-group-prepend mr-1 ">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </div>
            Windbreaker
          </div>
          
          <div className="my-1 d-flex tick">
            <div class="input-group-prepend mr-1 ">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </div>
            Windbreaker
          </div>
          <div className="my-1 d-flex tick">
            <div class="input-group-prepend mr-1 ">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </div>
            Windbreaker
          </div>
          
        </div>
      </div>
      <div className="box border-bottom">
        <div className="box-label text-uppercase d-flex align-items-center">
          season
          <button
            className="btn ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#inner-box2"
            aria-expanded="true"
            aria-controls="inner-box2"
            
          >
            +
          </button>
        </div>
        <div id="inner-box2" className="mt-2 mr-1 collapse show" style={{}}>
          <div className="my-1 d-flex tick">
            <div class="input-group-prepend mr-1 ">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </div>
            Windbreaker
          </div>
          <div className="my-1 d-flex tick">
            <div class="input-group-prepend mr-1 ">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </div>
            Windbreaker
          </div>
          
          <div className="my-1 d-flex tick">
            <div class="input-group-prepend mr-1 ">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </div>
            Windbreaker
          </div>
          <div className="my-1 d-flex tick">
            <div class="input-group-prepend mr-1 ">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </div>
            Windbreaker
          </div>
          
        </div>
      </div>
      <div className="box border-bottom">
        <div className="box-label text-uppercase d-flex align-items-center">
          price
          <button
            className="btn ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#price"
            aria-expanded="false"
            aria-controls="price"
          >
            +
          </button>
        </div>
        <div className="collapse" id="price">
          <div className="middle">
            <div className="multi-range-slider">
              <input
                type="range"
                id="input-left"
                min={0}
                max={100}
                defaultValue={10}
              />
              <input
                type="range"
                id="input-right"
                min={0}
                max={100}
                defaultValue={50}
              />
              <div className="slider">
                <div className="track" />
                <div className="range" style={{ left: "10%", right: "50%" }} />
                <div className="thumb left" style={{ left: "10%" }} />
                <div className="thumb right" style={{ right: "50%" }} />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div>
              <span id="amount-left" className="font-weight-bold">
                1000
              </span>
              uah
            </div>
            <div>
              <span id="amount-right" className="font-weight-bold">
                5000
              </span>
              uah
            </div>
          </div>
        </div>
      </div>
      <div className="box">
        <div className="box-label text-uppercase d-flex align-items-center">
          size
          <button
            className="btn ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#size"
            aria-expanded="false"
            aria-controls="size"
          >
            +
          </button>
        </div>
        <div id="size" className="collapse">
          <div
            className="btn-group d-flex align-items-center flex-wrap"
            data-toggle="buttons"
          >
            <label className="btn btn-success form-check-label">
              <input className="form-check-input" type="checkbox" /> 80
            </label>
            <label className="btn btn-success form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked=""
              />
              92
            </label>
            <label className="btn btn-success form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked=""
              />
              102
            </label>
            <label className="btn btn-success form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked=""
              />
              104
            </label>
            <label className="btn btn-success form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked=""
              />
              106
            </label>
            <label className="btn btn-success form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked=""
              />
              108
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
