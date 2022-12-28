import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import moment from "moment";

import {
  getExtraInforDoctorById,
  getAllListPatient,
} from "../../../services/userService";
import "./ListPatienShedule.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
class ListPatienShedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPatient: [],
    };
  }

  async componentDidMount() {
    let res = await getAllListPatient("S2");
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
        <div className="col-12 table-manage-patient-loading">
          <h1> Danh sách bệnh nhân đang chờ</h1>
          <table class="table table-light">
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
              {listPatient &&
                listPatient.length > 0 &&
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
                })}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPatienShedule);
