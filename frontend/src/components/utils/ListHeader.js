import React from 'react'

const ListHeader = () => {
  return (
    <div className="bg-white rounded d-flex align-items-center justify-content-between">
          <button className="btn btnhide text-uppercase">Hide Filters</button>
          <nav className="navbar navbar-expand-lg navbar-light pl-lg-0 pl-auto">
            <div className="collapse navbar-collapse" id="mynav">
              {" "}
              <ul className="navbar-nav d-lg-flex align-items-lg-center">
                {" "}
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle mx-5"
                    type="button"
                  >
                    Sort By
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div>
                <li className="nav-item d-inline-flex align-items-center justify-content-between mb-lg-0 mb-3">
                  {" "}
                  <div
                    className="d-inline-flex align-items-center mx-lg-2"
                    id="select2"
                  >
                    {" "}
                    <div className="pl-2">Products:</div>{" "}
                  </div>{" "}
                </li>{" "}
                <li className="nav-item d-lg-none d-inline-flex"> </li>{" "}
              </ul>{" "}
            </div>{" "}
          </nav>
          <div className="ml-auto mt-3 mr-2">
            {" "}
            <nav aria-label="Page navigation example">
              {" "}
              <ul className="pagination">
                {" "}
                <li className="page-item">
                  {" "}
                  <a className="page-link" href="#" aria-label="Previous">
                    {" "}
                    <span aria-hidden="true" className="font-weight-bold">
                      &lt;
                    </span>{" "}
                    <span className="sr-only">Previous</span>{" "}
                  </a>{" "}
                </li>{" "}
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>{" "}
                <li className="page-item">
                  <a className="page-link" href="#">
                    ..
                  </a>
                </li>{" "}
                <li className="page-item">
                  <a className="page-link" href="#">
                    24
                  </a>
                </li>{" "}
                <li className="page-item">
                  {" "}
                  <a className="page-link" href="#" aria-label="Next">
                    {" "}
                    <span aria-hidden="true" className="font-weight-bold">
                      &gt;
                    </span>{" "}
                    <span className="sr-only">Next</span>{" "}
                  </a>{" "}
                </li>{" "}
              </ul>{" "}
            </nav>{" "}
          </div>
        </div>
  )
}

export default ListHeader