import React, { Component } from "react";

import { connect } from "react-redux";

import Slider from "react-slick";
class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section"> Chuyên Khoa Phổ Biến</span>
            <button type="button" className="btn-section">
              {" "}
              Xem them
            </button>
          </div>
          <div href="#" className="section-content">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="img-bg section-medical-facility " />
                <span>Viện Tư vấn Tâm lý SunnyCare</span>
              </div>
              <div className="section-customize">
                <div className="img-bg section-medical-facility" />
                <span>Viện Tư vấn Tâm lý SunnyCare</span>
              </div>
              <div className="section-customize">
                <div className="img-bg section-medical-facility" />
                <span>Viện Tư vấn Tâm lý SunnyCare</span>
              </div>
              <div className="section-customize">
                <div className="img-bg section-medical-facility" />
                <span>Viện Tư vấn Tâm lý SunnyCare</span>
              </div>
              <div className="section-customize">
                <div className="img-bg section-medical-facility" />
                <span>Viện Tư vấn Tâm lý SunnyCare</span>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
