import React, { Component } from "react";

import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        {" "}
        <div className="section-container">
          <div className="section-header">
            <div className="title-section">Hướng Dẫn Book a Doctor
              <span className="border-load-tutorial"></span></div>
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="320x"
                src="https://www.youtube.com/embed/3UYBsBnJe7U"
                title="How to Schedule an Appointment in English"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>{" "}
            <div className="content-right text-center">
              <h3>Tại sao nên lựa chọn chúng tôi:</h3>
              <ul className="">
                <li>Tiết kiệm chi phí</li>
                <li>Nhanh chóng thời gian linh hoạt</li>
                <li>Gặp được những bác sĩ hàng đầu trong ngành</li>
                <li>Hỗ trợ hết minh cho khách hàng</li>
                <li>Thanh toán thuận tiện</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
