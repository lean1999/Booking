import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./ProfileDoctor.scss";
import moment from "moment";

import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import _ from "lodash";
import { Link } from "react-router-dom";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      // this.getInforDoctor(this.props.doctorId)
    }
  }

  renderTimeBooking = (dataTime, language) => {
    console.log("check 123123d d", dataTime);
    if (dataTime && !_.isEmpty(dataTime)) {
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {language === LANGUAGES.VI &&
              dataTime &&
              dataTime.timeTypeData.valueVi + " " + date}
            {language === LANGUAGES.EN &&
              dataTime &&
              dataTime.timeTypeData.valueEn + " " + date}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.price-bookign" />
          </div>
        </>
      );
    }
    return <></>;
  };
  render() {
    console.log("check state file profile DOctor", this.state);
    let { dataProfile } = this.state;
    let {
      language,
      isShowDescriptionDoctor,
      dataTime,
      isShowPrice,
      isShowLinkDetail,
      doctorId,
    } = this.props;
    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi},  ${dataProfile.lastName} ${dataProfile.firstName} `;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    console.log("check datatime", dataTime);
    return (
      <>
        <div className="profile-doctor-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url("${
                  dataProfile && dataProfile.image ? dataProfile.image : ""
                }")`,
              }}
            ></div>
            <div className="content-right">
              <div className="content-up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="content-down">
                {isShowDescriptionDoctor === true ? (
                  <>
                    {dataProfile &&
                      dataProfile.Markdown &&
                      dataProfile.Markdown.description && (
                        <span>{dataProfile.Markdown.description}</span>
                      )}
                  </>
                ) : (
                  <>{this.renderTimeBooking(dataTime, language)}</>
                )}
              </div>
            </div>
          </div>
          {isShowLinkDetail === true && (
            <div className="view-detail-doctor">
              <Link
                to={`/detail-doctor/${doctorId}`}
                className="view-detail-link"
              >
                Xem Thêm
              </Link>
            </div>
          )}
          {isShowPrice === true && (
            <div className="price">
              {" "}
              <FormattedMessage id="patient.booking-modal.price-book" />
              {dataProfile &&
                dataProfile.Doctor_Info &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    value={dataProfile.Doctor_Info.priceTypeData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VND"}
                  />
                )}
              {dataProfile &&
                dataProfile.Doctor_Info &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    value={dataProfile.Doctor_Info.priceTypeData.valueEn}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"$"}
                  />
                )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
