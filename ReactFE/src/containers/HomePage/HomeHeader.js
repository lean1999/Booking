import React, { Component } from "react";

import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
class HomeHeader extends Component {
  ChangeLanguages = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    let language = this.props.language;

    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>

              <div className="header-logo">
                <a href="/home" className="header-logo-link">
                  <span>
                    Booking
                  </span>
                  <span>
                    Doctor.com
                  </span>

                </a>
              </div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.Speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.Search-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.Health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.Select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.Doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.Select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="home-header.Fee" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.Check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fa fa-question-circle"></i>
                <FormattedMessage id="home-header.Sp" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span
                  onClick={() => {
                    this.ChangeLanguages(LANGUAGES.VI);
                  }}
                >
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span
                  onClick={() => {
                    this.ChangeLanguages(LANGUAGES.EN);
                  }}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="center">
                <div className="title">
                  <h3>
                    <FormattedMessage id="banner.t-one" />
                  </h3>
                </div>
                <div className="title">
                  <h1>
                    {" "}
                    <FormattedMessage id="banner.t-two" />
                  </h1>
                </div>
                <div className="search">
                  <i className="fa fa-search"></i>
                  <input type="text" placeholder="Tìm Bác Sĩ" />
                </div>
              </div>
            </div>
            <div className="content-down">
              <div className="banner-options">
                <div className="option-child">
                  <div className="icon-child one"></div>
                  <div className="text-child">
                    {" "}
                    Khám
                    <br /> Chuyên Khoa
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child two"></div>
                  <div className="text-child">
                    Khám <br /> từ xa
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child three"></div>
                  <div className="text-child">
                    Khám <br /> tổng quát
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child four"></div>
                  <div className="text-child">
                    Xét nhiệm <br /> y học
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child five"></div>
                  <div className="text-child">
                    Sức Khỏe <br /> Tinh Thần
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child six"></div>
                  <div className="text-child">
                    Khám <br /> Nha Khoa
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child seven"></div>
                  <div className="text-child">
                    Gói <br /> Phẩu Thuật
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child eight"></div>
                  <div className="text-child">
                    Sản Phẩm <br /> Y Tế
                  </div>
                </div>{" "}
                <div className="option-child">
                  <div className="icon-child nine"></div>
                  <div className="text-child">
                    Sức Khỏe <br /> Doanh Nghiệp
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
