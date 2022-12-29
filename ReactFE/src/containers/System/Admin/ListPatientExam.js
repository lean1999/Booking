import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import moment from "moment";

import {
  getExtraInforDoctorById,
  getAllListPatient,
} from "../../../services/userService";
import "./ListPatientExam.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
class ListPatientExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPatient: [],
    };
  }

  async componentDidMount() {
    let res = await getAllListPatient("S4");
    console.log("res", res);
    if (res && res.err === 0) {
      this.setState({
        listPatient: res.patientAccept.data,
      });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { listPatient } = this.state;
    console.log("data patient", listPatient);
    return (
      <>
        <div className="col-12 table-manage-patient-success">
          <h1> Danh sách bệnh nhân đã khám :</h1>
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Thời gian</th>
                <th scope="col">Họ và tên </th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Giới tính</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {listPatient && listPatient.length > 0 ? (
                listPatient.map((item, index) => {
                  console.log("item", item);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.timeTypeDataPatient.valueEn}</td>
                      <td>{item.patientData.lastName}</td>
                      <td>{item.patientData.address}</td>
                      <td>{item.patientData.genderData.valueVi}</td>
                      <td>{item.patientData.email}</td>
                    </tr>
                  );
                })
              ) : (
                <div className="tbl-content">
                  <table>
                    <tbody>
                      <tr>
                        <h1>NO DATA</h1>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </tbody>
          </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPatientExam);
