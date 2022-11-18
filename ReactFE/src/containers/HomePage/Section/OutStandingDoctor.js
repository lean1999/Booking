import React, { Component } from "react";

import { connect } from "react-redux";

import Slider from "react-slick";
class OutStandingDoctor extends Component {
  render() {
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section"> Bác sĩ nổi bật tuần qua</span>
            <button type="button" className="btn-section">
              {" "}
              Xem them
            </button>
          </div>
          <div href="#" className="section-content">
            <Slider {...this.props.settings}>
              <div className="section-customize border">
                <div className="cus-border">
                  {" "}
                  <div className="outer-bg">
                    <div className="img-bg section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <span>Chuc vi</span>
                    <div>Chuyen khoa</div>
                  </div>
                </div>
              </div>

              <div className="section-customize border">
                <div className="cus-border">
                  {" "}
                  <div className="outer-bg">
                    <div className="img-bg section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <span>Chuc vi</span>
                    <div>Chuyen khoa</div>
                  </div>
                </div>
              </div>

              <div className="section-customize border">
                <div className="cus-border">
                  {" "}
                  <div className="outer-bg">
                    <div className="img-bg section-outstanding-doctor " />
                  </div>
                  <div className="position text-center">
                    <span>Chuc vi</span>
                    <div>Chuyen khoa</div>
                  </div>
                </div>
              </div>

              <div className="section-customize border">
                <div className="cus-border">
                  {" "}
                  <div className="outer-bg">
                    <div className="img-bg section-outstanding-doctor " />
                  </div>
                  <div className="position text-center">
                    <span>Chuc vi</span>
                    <div>Chuyen khoa</div>
                  </div>
                </div>
              </div>

              <div className="section-customize border">
                <div className="cus-border">
                  {" "}
                  <div className="outer-bg">
                    <div className="img-bg section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <span>Chuc vi</span>
                    <div>Chuyen khoa</div>
                  </div>
                </div>
              </div>

              <div className="section-customize border">
                <div className="cus-border">
                  {" "}
                  <div className="outer-bg">
                    <div className="img-bg section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <span>Chuc vi</span>
                    <div>Chuyen khoa</div>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
