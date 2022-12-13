import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetaiSpecialty.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
class DetaiSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDoctorId: [155],
    };
  }

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { currentDoctorId } = this.state;
    console.log(this.state);
    return (
      <>
        <HomeHeader />

        <h1>Specialty</h1>

        {currentDoctorId &&
          currentDoctorId.length > 0 &&
          currentDoctorId.map((item, index) => {
            console.log(item);
            return (
              <DoctorSchedule detailDoctorIdFromParent={currentDoctorId} />
            );
          })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetaiSpecialty);
