import React, { Component } from "react";
import { connect } from "react-redux";
// import Select from "react-select";
// import "./DoctorExtraInfor.scss";
// import moment from "moment";

import { getAllPatientAccept } from "../../../services/userService";
// import { LANGUAGES } from "../../../utils";
// import { FormattedMessage } from "react-intl";
// import NumberFormat from "react-number-format";
import { Chart } from "react-google-charts";
class ManageHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPatient: [],
      arrPatient1: [],
    };
  }

  async componentDidMount() {
    await this.getAllPatientAcceptDK();
    await this.getAllPatientAcceptCK();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  getAllPatientAcceptDK = async () => {
    let response = await getAllPatientAccept("S4");
    if (response && response.err === 0) {
      this.setState({
        arrPatient: response.patientAccept,
      });
    }
  };
  getAllPatientAcceptCK = async () => {
    let response = await getAllPatientAccept("S2");
    if (response && response.err === 0) {
      this.setState({
        arrPatient1: response.patientAccept,
      });
    }
  };
  render() {
    let { arrPatient, arrPatient1 } = this.state;
    let dataArrPatient = arrPatient.length;
    let dataArrPatient1 = arrPatient1.length;
    console.log("chekc 1", arrPatient.length);
    console.log("chekc 2", arrPatient1.length);
    // if (arrPatient && arrPatient.length >= 0) {
    //   return (dataArrPatient = arrPatient.length);
    // }
    // if (arrPatient1 && arrPatient1.length >= 0) {
    //   return (dataArrPatient1 = arrPatient1.length);
    // }

    const data = [
      ["Bệnh nhân đã đặt lịch", "Bệnh nhân chưa đặt lịch"],
      ["Bệnh nhân đã đặt lịch", dataArrPatient * 10],
      ["Bệnh nhân chưa đặt lịch", 100 - dataArrPatient * 10],
    ];

    const options = {
      title: "Tổng số bệnh nhân đã đặt lịch",
      sliceVisibilityThreshold: 0.2, // 20%
    };
    const data1 = [
      ["Bệnh nhân chưa khám", "Bênh nhân đã khám"],
      ["Bệnh nhân chưa khám", 100 - dataArrPatient1 * 10],
      ["Bệnh nhân đã khám", dataArrPatient1 * 10],
    ];

    const options1 = {
      title: "Tổng số bệnh nhân đã khám",
      sliceVisibilityThreshold: 0.2, // 20%
    };
    return (
      <>
        <div className="chart-container">
          <h1>Biểu đồ</h1>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
          <Chart
            chartType="PieChart"
            data={data1}
            options={options1}
            width={"100%"}
            height={"400px"}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandBook);
