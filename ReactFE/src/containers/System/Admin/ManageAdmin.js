import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageAdmin.scss";
import UserManage from "../UserManage";
import UserRedux from "./UserRedux";
import ManageDoctor from "./ManageDoctor";
import ManageSchedule from "../Doctor/ManageSchedule";
import ManageClinic from "../Clinic/ManageClinic";
import ManageSpecialty from "../Specialty/ManageSpecialty";
import { FaBeer, FaUserCircle } from "react-icons/fa";
import { BiUser, BiLogOut, BiBookContent, BiBrain } from "react-icons/bi";
import { FcDepartment } from "react-icons/fc";
import * as actions from "../../../store/actions";
import ManagePatient from "../Doctor/ManagePatient";
import ManagePrescription from "../Doctor/ManagePrescription";
import ManageHandBook from "./ManageHandBook";
import ListPatientExam from "./ListPatientExam";
import ListPatienShedule from "./ListPatienShedule";
class ManageAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCrudUser: false,
      showCrudReduxUser: false,
      showManageDoctor: false,
      showManagePlanExam: false,
      showManageClinic: false,
      showSpeciallist: false,
      showHandBook: false,
      showManageDoctorRole: false,
      showManagePatient: false,
      showManagePrescription: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
    };
  }

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handShowCrudUser = () => {
    this.setState({
      showCrudUser: true,
      showCrudReduxUser: false,
      showManageDoctor: false,
      showManagePlanExam: false,
      showManageClinic: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowCrudUserRedux = () => {
    this.setState({
      showCrudReduxUser: true,
      showCrudUser: false,
      showManageDoctor: false,
      showManagePlanExam: false,
      showManageClinic: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowManageDoctor = () => {
    this.setState({
      showManageDoctor: true,
      showCrudUser: false,
      showCrudReduxUser: false,
      showManagePlanExam: false,
      showManageClinic: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowPlanExam = () => {
    this.setState({
      showManagePlanExam: true,
      showManageDoctor: false,
      showCrudUser: false,
      showCrudReduxUser: false,
      showManageClinic: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowManageClinic = () => {
    this.setState({
      showManageClinic: true,
      showManagePlanExam: false,
      showManageDoctor: false,
      showCrudUser: false,
      showCrudReduxUser: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowSpecialist = () => {
    this.setState({
      showSpeciallist: true,
      showManagePlanExam: false,
      showManageDoctor: false,
      showCrudUser: false,
      showCrudReduxUser: false,
      showManageClinic: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowHandBook = () => {
    this.setState({
      showManageClinic: false,
      showManagePlanExam: false,
      showManageDoctor: false,
      showCrudUser: false,
      showCrudReduxUser: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: true,
    });
  };

  handShowManagePatient = () => {
    this.setState({
      showManagePatient: true,
      showManageDoctorRole: false,
      showManagePrescription: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
    });
  };
  handShowManageDoctorMN = () => {
    this.setState({
      showManagePatient: false,
      showManageDoctorRole: true,
      showManagePrescription: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
    });
  };
  handShowManagePresition = () => {
    this.setState({
      showManagePatient: false,
      showManageDoctorRole: false,
      showManagePrescription: true,
      showListPatientExamined: false,
      showListPatientScheduled: false,
    });
  };
  handleShowListPatientExamined = () => {
    this.setState({
      showManagePatient: false,
      showManageDoctorRole: false,
      showManagePrescription: false,
      showListPatientExamined: true,
      showListPatientScheduled: false,
    });
  };
  handleShowListPatientScheduled = () => {
    this.setState({
      showManagePatient: false,
      showManageDoctorRole: false,
      showManagePrescription: false,
      showListPatientExamined: false,
      showListPatientScheduled: true,
    });
  };

  render() {
    let {
      showCrudReduxUser,
      showCrudUser,
      showHandBook,
      showManageClinic,
      showManageDoctor,
      showSpeciallist,
      showManagePlanExam,
      showManageDoctorRole,
      showManagePatient,
      showManagePrescription,
      showListPatientExamined,
      showListPatientScheduled,
    } = this.state;
    const { isLoggedIn, userInfo, processLogout } = this.props;
    // console.log('checl', userInfo.roleId)
    return (
      <>
        {isLoggedIn && userInfo.roleId === "R1" ? (
          <>
            <div className="container-manage-admin">
              <div className="manage-admin">
                <div className="content-left-admin">
                  <div className="title-app">BOOKING DOCTOR </div>
                  <div className="menu-manage-admin">
                    <div className="mn-user">
                      <BiUser className="icon-user" /> Quản Lý Người Dùng
                      <div className="sub-mn" onClick={this.handShowCrudUser}>
                        CRUD User
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowCrudUserRedux}
                      >
                        CRUD Redux User
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowManageDoctor}
                      >
                        Quản Lý Bác Sĩ
                      </div>
                      <div className="sub-mn" onClick={this.handShowPlanExam}>
                        Quản Lý Kế Hoạch Khám
                      </div>
                    </div>
                    <div className="mn-clinic">
                      Phòng Khám
                      <div
                        className="sub-mn"
                        onClick={this.handShowManageClinic}
                      >
                        Quản Lý Phòng Khám
                      </div>
                    </div>
                    <div className="mn-specialist">
                      Chuyên Khoa
                      <div className="sub-mn" onClick={this.handShowSpecialist}>
                        Quản Lý Chuyên Khoa
                      </div>
                    </div>
                    <div
                      className="mn-handlebook"
                      onClick={this.handShowHandBook}
                    >
                      Biểu Đồ
                      <div className="sub-mn">Quản Lý Biểu đồ</div>
                    </div>

                    <div className="mn-exit">
                      <a
                        href="/"
                        style={{ textDecoration: "none" }}
                        onClick={processLogout}
                      >
                        <BiLogOut /> Thoát
                      </a>
                    </div>
                  </div>
                </div>
                <div className="content-right-admin">
                  <div className="header-content-right-admin">
                    <div className="title-manage-admin">Quản trị Admin</div>
                    <div className="info-admin"> Admin</div>
                  </div>
                  <div className="show-content-right-admin">
                    {showCrudUser === true ? <UserManage /> : <></>}
                    {showCrudReduxUser === true ? <UserRedux /> : <></>}
                    {showManageDoctor === true ? <ManageDoctor /> : <></>}
                    {showManagePlanExam === true ? <ManageSchedule /> : <></>}
                    {showManageClinic === true ? <ManageClinic /> : <></>}
                    {showSpeciallist === true ? <ManageSpecialty /> : <></>}
                    {showHandBook === true ? <ManageHandBook /> : <></>}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {isLoggedIn && userInfo.roleId === "R2" ? (
          <>
            <div className="container-manage-admin">
              <div className="manage-admin">
                <div className="content-left-admin">
                  <div className="title-app">BOOKING DOCTOR </div>
                  <div className="menu-manage-admin">
                    <div className="mn-user">
                      Quản Lý Lịch Trình Bác Sĩ
                      <div
                        className="sub-mn"
                        onClick={this.handShowManageDoctorMN}
                      >
                        Quản Lý Kế Hoạch Khám
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowManagePatient}
                      >
                        Quản Lý Bệnh Nhân Khám
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowManagePresition}
                      >
                        Quản Lý Đơn Thuốc
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handleShowListPatientExamined}
                      >
                        Danh sách bệnh nhân đã khám
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handleShowListPatientScheduled}
                      >
                        Danh sách bệnh nhân đã đặt lịch
                      </div>
                    </div>
                    <div
                      className="mn-handlebook"
                      onClick={this.handShowHandBook}
                    >
                      Bệnh Nhân
                    </div>
                    <div className="mn-exit">
                      <a
                        href="/"
                        style={{ textDecoration: "none" }}
                        onClick={processLogout}
                      >
                        Thoát <BiLogOut />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="content-right-admin">
                  <div className="header-content-right-admin">
                    <div className="title-manage-admin">Bác Sĩ Quản Lý</div>
                    <div className="info-admin"> Bác Sĩ</div>
                  </div>
                  <div className="show-content-right-admin">
                    {showManageDoctorRole === true ? <ManageSchedule /> : <></>}
                    {showManagePatient === true ? <ManagePatient /> : <></>}
                    {showManagePrescription === true ? (
                      <ManagePrescription />
                    ) : (
                      <></>
                    )}
                    {showListPatientExamined === true ? (
                      <ListPatientExam />
                    ) : (
                      <></>
                    )}
                    {showListPatientScheduled === true ? (
                      <ListPatienShedule />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);
