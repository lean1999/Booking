import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageAdmin.scss";
import UserManage from "../UserManage";
import UserRedux from "./UserRedux";
import ManageDoctor from "./ManageDoctor";
import ManageSchedule from "../Doctor/ManageSchedule";
import ManageClinic from "../Clinic/ManageClinic";
import ManageSpecialty from "../Specialty/ManageSpecialty";
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
    });
  };
  handShowHandBook = () => {
    this.setState({
      showManagePlanExam: false,
      showManageDoctor: false,
      showCrudUser: false,
      showCrudReduxUser: false,
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
    } = this.state;

    return (
      <>
        <div className="container-manage-admin">
          <div className="manage-admin">
            <div className="content-left-admin">
              <div className="title-app">BOOKING CARE </div>
              <div className="menu-manage-admin">
                <div className="mn-user">
                  Quản Lý Người Dùng
                  <div className="sub-mn" onClick={this.handShowCrudUser}>
                    CRUD User
                  </div>
                  <div className="sub-mn" onClick={this.handShowCrudUserRedux}>
                    CRUD Redux User
                  </div>
                  <div className="sub-mn" onClick={this.handShowManageDoctor}>
                    Quản Lý Bác Sĩ
                  </div>
                  <div className="sub-mn" onClick={this.handShowPlanExam}>
                    Quản Lý Kế Hoạch Khám
                  </div>
                </div>
                <div className="mn-clinic">
                  Phòng Khám
                  <div className="sub-mn" onClick={this.handShowManageClinic}>
                    Quản Lý Phòng Khám
                  </div>
                </div>
                <div className="mn-specialist">
                  Chuyên Khoa
                  <div className="sub-mn" onClick={this.handShowSpecialist}>
                    Quản Lý Chuyên Khoa
                  </div>
                </div>
                <div className="mn-handlebook" onClick={this.handShowHandBook}>
                  Cẩm Nang
                  <div className="sub-mn">Quản Lý Cẩm Nang</div>
                </div>
                <div className="mn-exit">
                  <a href="/" style={{ textDecoration: "none" }}>
                    Thoát
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
                {showHandBook === true ? <ManageSchedule /> : <></>}
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);
