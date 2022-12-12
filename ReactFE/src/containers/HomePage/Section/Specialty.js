import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import "./Specialty.scss";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    console.log(res);
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }
  render() {
    let { dataSpecialty } = this.state;
    return (
      <>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                {" "}
                <FormattedMessage id="home-pages.specialty-popular" />
              </span>
              <button type="button" className="btn-section">
                {" "}
                <FormattedMessage id="home-pages.more-info" />
              </button>
            </div>
            <div href="#" className="section-content">
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <div className="section-customize specialty-child">
                        <div
                          className="img-bg section-specialty"
                          style={{
                            backgroundImage: `url("${item.image}")`,
                          }}
                        />
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
