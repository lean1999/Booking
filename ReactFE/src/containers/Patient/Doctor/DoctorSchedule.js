import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTimes: [],
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);
    this.setState({ allDays: allDays });
  }

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        object.label = moment(new Date())
          .add(i, "days")
          .format(" dddd - DD/MM");
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format(" dddd - DD/MM");
      }

      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (
      this.props.detailDoctorIdFromParen !== prevProps.detailDoctorIdFromParent
    ) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.detailDoctorIdFromParen,
        allDays[0].value
      );
      console.log("check res before", res);
      // this.setState({
      //   allAvalableTimes: res.data ? res.data : [],
      // });

      //tren no k goi dc
      //cai lz nay nay
    }
  }
  handleOnChangeSelect = async (event) => {
    if (
      this.props.detailDoctorIdFromParent &&
      this.props.detailDoctorIdFromParent !== -1
    ) {
      let doctorId = this.props.detailDoctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvalableTimes: res.data ? res.data : [],
        });
        console.log("check res after", res);
        //day
      }
    }
  };
  render() {
    let { allDays, allAvalableTimes } = this.state;
    let { language } = this.props;
    console.log("check props", this.props);
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(event) => this.handleOnChangeSelect(event)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-available-time">
          <div className="text-calendar">
            <i className="fa fa-calendar-alt"></i> <span>Lịch Khám </span>
          </div>
          <div className="time-content">
            {allAvalableTimes && allAvalableTimes.length > 0 ? (
              allAvalableTimes.map((item, index) => {
                let timeDisplay =
                  language === LANGUAGES.VI
                    ? item.timeTypeData.valueVi
                    : item.timeTypeData.valueEn;
                return <button key={index}> {timeDisplay}</button>;
              })
            ) : (
              <div>
                Không có lịch hẹn thời gian này , Vui lòng chọn thời gian khác!
              </div>
            )}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
