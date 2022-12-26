import React, { Component } from "react";

import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
class HandBook extends Component {
  render() {
    return (
      <>
        <div className="section-share section-handbook">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                {" "}
                Tin Tức Nối Bật Tuần Qua
                <span className="border-load-news"></span>
              </span>
              <button type="button" className="btn-section">
                {" "}
                Xem them
              </button>
            </div>
            <div href="#" className="section-content">
              <Slider {...this.props.settings}>
                <div className="section-customize">
                  <div className="img-bg section-handbook" />
                  <span className="news">Bản Tin 1</span>
                </div>
                <div className="section-customize">
                  <div className="img-bg section-handbook" />
                  <span className="news">Bản Tin 2</span>
                </div>
                <div className="section-customize">
                  <div className="img-bg section-handbook" />
                  <span className="news">Bản Tin 3</span>
                </div>
                <div className="section-customize">
                  <div className="img-bg section-handbook" />
                  <span className="news">Bản Tin 4</span>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
