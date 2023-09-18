import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  return (
    <section id="footer-shop">
      <footer className="">
        <div className="container ">
          <div className="row ">
            <div className="col-md-4">
              <span className="copyright">
                <img
                  src="/logo.png"
                  height={70}
                  alt=""
                  style={{ borderRadius: "50%" }}
                />
              </span>
            </div>
            <div className="col-md-4 ">
              <ul className="list-inline quicklinks">
                <li>
                  <h6 className=" mt-4">Oltinsoy AKM</h6>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
