import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetaiSpecialty.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getAllDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import Footer from "../../Footer";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllDetailSpecialtyById({
        id: id,
        location: "ALL",
      });

      let resProvince = await getAllCodeService("PROVINCE");
      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let currentDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              currentDoctorId.push(item.doctorId);
            });
          }
        }
        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            updatedAt: null,
            valueEn: "ALL",
            valueVi: "Toàn Quốc",
          });
        }
        this.setState({
          dataDetailSpecialty: res.data,
          currentDoctorId: currentDoctorId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;
      let res = await getAllDetailSpecialtyById({
        id: id,
        location: location,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let currentDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              currentDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataDetailSpecialty: res.data,
          currentDoctorId: currentDoctorId,
        });
      }
    }
  };
  render() {
    let { currentDoctorId, dataDetailSpecialty, listProvince } = this.state;
    let { language } = this.props;
    console.log("data", this.state);
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          <div className="search-sp-doctor">
            <select
              onChange={(event) => this.handleOnChangeSelect(event)}
              className="doctor-select"
            >
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>
          {currentDoctorId &&
            currentDoctorId.length > 0 &&
            currentDoctorId.map((item, index) => {
              return (
                <>
                  <div className="each-doctor" key={index}>
                    <div className="dt-content-left">
                      <div className="profile-doctor">
                        <ProfileDoctor
                          doctorId={item}
                          isShowDescriptionDoctor={true}
                          isShowLinkDetail={true}
                          isShowPrice={false}
                          // dataTime={dataTime}
                        />
                      </div>
                    </div>
                    <div className="dt-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule detailDoctorIdFromParent={item} />
                      </div>
                      <div className="doctor-extra-info">
                        <DoctorExtraInfor doctorIdFromParent={item} />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <Footer />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
