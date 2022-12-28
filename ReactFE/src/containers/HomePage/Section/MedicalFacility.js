import React, { Component } from "react";

import { connect } from "react-redux";

import Slider from "react-slick";

import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";
import Footer from "../../Footer";
// import "./MedicalFacility.scss";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };
  render() {
    let { dataClinic } = this.state;
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              {" "}
              Cơ Sở Y Tế Nổi Bật
              <span className="border-load-outstanding"></span>
            </span>

            <button type="button" className="btn-section">
              {" "}
              Xem thêm
            </button>
          </div>
          <div href="#" className="section-content">
            <Slider {...this.props.settings}>
              {dataClinic &&
                dataClinic.length > 0 &&
                dataClinic.map((item, index) => {
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div
                        className="img-bg section-medical-facility "
                        style={{
                          backgroundImage: `url("${item.image}")`,
                        }}
                      />
                      <span className="dt-name">{item.name}</span>
                    </div>
                  );
                })}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
