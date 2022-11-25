import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  render() {
    let arrDoctorsa = this.state.arrDoctors;
    let { language } = this.props;
    console.log("check props", this.props);
    console.log("check state arr doctor", arrDoctorsa);
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section"> Bac si noi bat tuan qua</span>
            <button type="button" className="btn-section">
              Xem them
            </button>
          </div>
          <div href="#" className="section-content">
            <Slider {...this.props.settings}>
              {arrDoctorsa &&
                arrDoctorsa.length >= 0 &&
                arrDoctorsa.map((item, index) => {
                  console.log("check item 2", item);
                  console.log("check item 1", item.id);
                  console.log("check item", item.positionData);
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }

                  {
                    {
                      /* let nameVi = `${item.positionData.valueVi},  ${item.firstName} ${item.lastName} `;
                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`; */
                    }
                  }
                  return (
                    <div className="section-customize border" key={index}>
                      <div>
                        <div
                          className="img-bg section-outstanding-doctor "
                          style={{
                            backgroundImage: `url("${imageBase64}")`,
                          }}
                        />
                      </div>
                      <div className="position text-center">
                        {/* {<h5>{language === LANGUAGES.VI ? nameVi : nameEn}</h5>} */}
                        <span>Giao su , Tien sy </span>
                      </div>
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
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
