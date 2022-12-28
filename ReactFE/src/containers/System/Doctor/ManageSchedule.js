import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import Select from "react-select";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import FormattedDate from "../../../components/Formating/FormattedDate";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      selectedDoctor: {},
      currentDate: new Date(),
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorsRedux();
    this.props.fetchAllScheduleTime();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      console.log(data);
      this.setState({
        rangeTime: data,
      });
    }
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let language = this.props.language;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = ` ${item.lastName} ${item.firstName}`;
        let labelEn = ` ${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };
  handleChangeDate = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveSchedule = async () => {
    let { rangeTime, currentDate, selectedDoctor } = this.state;
    let result = [];
    this.setState({
      rangeTime: rangeTime,
    });
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Select DocTor Required");
      return;
    }
    if (!currentDate) {
      toast.error("Date Required");
      return;
    }

    // let formattedDate = moment(currentDate).unix();
    let formattedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formattedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Select Time");
        return;
      }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formattedDate: formattedDate,
    });
    if (res && res.errCode === 0) {
      toast.success("Success");
    } else {
      toast.error("Error");
    }
  };

  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setHours(0, 0, 0, 0));
    return (
      <>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.chooseDoctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChangeSelect}
                  options={this.state.listDoctor}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="manage-schedule.chooseDate" />
                </label>
                <DatePicker
                  onChange={this.handleChangeDate}
                  className="form-control"
                  value={this.state.currentDate}
                  minDate={yesterday}
                />
              </div>
              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        className={
                          item.isSelected === true
                            ? "btn btn-schedule active"
                            : "btn btn-schedule"
                        }
                        key={index}
                        onClick={() => this.handleClickBtnTime(item)}
                      >
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    );
                  })}
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => this.handleSaveSchedule()}
            >
              <FormattedMessage id="manage-schedule.save" />
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
