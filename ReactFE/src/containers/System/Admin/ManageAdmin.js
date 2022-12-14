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
                      <BiUser className="icon-user" /> Qu???n L?? Ng?????i D??ng
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
                        Qu???n L?? B??c S??
                      </div>
                      <div className="sub-mn" onClick={this.handShowPlanExam}>
                        Qu???n L?? K??? Ho???ch Kh??m
                      </div>
                    </div>
                    <div className="mn-clinic">
                      Ph??ng Kh??m
                      <div
                        className="sub-mn"
                        onClick={this.handShowManageClinic}
                      >
                        Qu???n L?? Ph??ng Kh??m
                      </div>
                    </div>
                    <div className="mn-specialist">
                      Chuy??n Khoa
                      <div className="sub-mn" onClick={this.handShowSpecialist}>
                        Qu???n L?? Chuy??n Khoa
                      </div>
                    </div>
                    <div
                      className="mn-handlebook"
                      onClick={this.handShowHandBook}
                    >
                      Bi???u ?????
                      <div className="sub-mn">Qu???n L?? Bi???u ?????</div>
                    </div>

                    <div className="mn-exit">
                      <a
                        href="/"
                        style={{ textDecoration: "none" }}
                        onClick={processLogout}
                      >
                        <BiLogOut /> Tho??t
                      </a>
                    </div>
                  </div>
                </div>
                <div className="content-right-admin">
                  <div className="header-content-right-admin">
                    <div className="title-manage-admin">Qu???n tr??? Admin</div>
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
                      Qu???n L?? L???ch Tr??nh B??c S??
                      <div
                        className="sub-mn"
                        onClick={this.handShowManageDoctorMN}
                      >
                        Qu???n L?? K??? Ho???ch Kh??m
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowManagePatient}
                      >
                        Qu???n L?? B???nh Nh??n Kh??m
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowManagePresition}
                      >
                        Qu???n L?? ????n Thu???c
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handleShowListPatientExamined}
                      >
                        Danh s??ch b???nh nh??n ???? kh??m
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handleShowListPatientScheduled}
                      >
                        Danh s??ch b???nh nh??n ???? ?????t l???ch
                      </div>
                    </div>
                    <div
                      className="mn-handlebook"
                      onClick={this.handShowHandBook}
                    >
                      B???nh Nh??n
                    </div>
                    <div className="mn-exit">
                      <a
                        href="/"
                        style={{ textDecoration: "none" }}
                        onClick={processLogout}
                      >
                        Tho??t <BiLogOut />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="content-right-admin">
                  <div className="header-content-right-admin">
                    <div className="title-manage-admin">B??c S?? Qu???n L??</div>
                    <div className="info-admin"> B??c S??</div>
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
