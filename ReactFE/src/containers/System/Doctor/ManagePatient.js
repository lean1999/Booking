import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./ManagePatient.scss";
import moment from "moment";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import RemedyModel from "./RemedyModel";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import CreatePrecription from "./CreatePrecription";
class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModel: {},
      isShowLoading: false,
      showCreatePresiton: false,
    };
  }

  handleOnchangeDatePiker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDatePatient();
      }
    );
  };

  // $(window).on("load resize ", function() {
  //   var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  //   $('.tbl-header').css({'padding-right':scrollWidth});
  // }).resize();
  async componentDidMount() {
    this.getDatePatient();
  }

  getDatePatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;

    let formattedDate = new Date(currentDate).getTime();
    console.log("this state", this.state);
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formattedDate,
    });
    console.log("res", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleChangeDate = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;

        let formattedDate = new Date(currentDate).getTime();

        this.getDatePatient(user, formattedDate);
      }
    );
  };
  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.lastName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModel: data,
    });
    console.log("data", data);
  };

  closeRemedyClose = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModel: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModel } = this.state;
    this.setState({ isShowLoading: true });
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModel.doctorId,
      patientId: dataModel.patientId,
      timeType: dataModel.timeType,
      language: this.props.language,
      patientName: dataModel.patientName,

      // ...dataChild,
    });
    if (res && res.errCode === 0) {
      toast.success("Send success message !");
      this.setState({ isShowLoading: false });
      this.closeRemedyClose();
      await this.getDatePatient();
    } else {
      toast.error("Send error message.....");
      this.setState({ isShowLoading: false });
    }
  };
  handleShowCreatePresition = () => {
    this.setState({ showCreatePresiton: true });
  };
  render() {
    let yesterday = new Date(new Date().setHours(0, 0, 0, 0));
    let { language } = this.props;
    let { dataPatient, isOpenRemedyModal, dataModel, showCreatePresiton } =
      this.state;

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="manage-patient-title">
              Quản lý bệnh nhân khám bệnh{" "}
            </div>
            <div className="manage-patient-body  row">
              <div className="col-4 form-group">
                <label> Chọn ngày khám</label>
                <DatePicker
                  onChange={this.handleChangeDate}
                  className="form-control"
                  value={this.state.currentDate}
                  minDate={yesterday}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <section>
                  <h1>Table Patient</h1>
                  <button
                    className="btn btn-primary create-precription"
                    onClick={this.handleShowCreatePresition}
                  >
                    Tạo Đơn Thuốc
                  </button>
                  {showCreatePresiton === true ? (
                    <>
                      <CreatePrecription />
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="tbl-header">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Thời gian</th>
                          <th>Họ và Tên</th>
                          <th>Địa chỉ</th>
                          <th>Giới Tính</th>
                          <th className="two">Actions</th>
                        </tr>
                      </thead>
                    </table>
                  </div>

                  {dataPatient && dataPatient.length > 0 ? (
                    dataPatient.map((item, index) => {
                      let time =
                        language === LANGUAGES.VI
                          ? item.timeTypeDataPatient.valueVi
                          : item.timeTypeDataPatient.valueEn;
                      let gender =
                        language === LANGUAGES.VI
                          ? item.patientData.genderData.valueVi
                          : item.patientData.genderData.valueEn;
                      return (
                        <div className="tbl-content">
                          <table>
                            <tbody>
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td> {time}</td>
                                <td> {item.patientData.lastName}</td>
                                <td>{item.patientData.address}</td>
                                <td>{gender}</td>
                                <td className="one">
                                  <button
                                    className="btn btn-confirm"
                                    onClick={() => this.handleBtnConfirm(item)}
                                  >
                                    Xác Nhận
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
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
                </section>
              </div>
            </div>
          </div>
          <RemedyModel
            isOpenModal={isOpenRemedyModal}
            dataModel={dataModel}
            closeRemedyClose={this.closeRemedyClose}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
