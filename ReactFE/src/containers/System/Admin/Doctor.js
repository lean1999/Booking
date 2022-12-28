import React, { Component } from "react";
import { connect } from "react-redux";
// import "./Doctor.scss";
import ManageSchedule from "../Doctor/ManageSchedule";
import ManagePatient from "../Doctor/ManagePatient";
import { BiUser, BiLogOut, BiBookContent, BiBrain } from "react-icons/bi";
import { FaUserNurse, FaUserCircle } from "react-icons/fa";
class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showManageDoctor: false,
      showManagePatient: false,
    };
  }

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handShowManagePatient = () => {
    this.setState({
      showManagePatient: true,
      showManageDoctor: false,
    });
  };
  handShowManageDoctor = () => {
    this.setState({
      showManagePatient: false,
      showManageDoctor: true,
    });
  };

  render() {
    let { showManageDoctor, showManagePatient } = this.state;

    return (
      <>
        <div className="container-manage-admin">
          <div className="manage-admin">
            <div className="content-left-admin">
              <div className="title-app">BOOKING CARE </div>
              <div className="menu-manage-admin">
                <div className="mn-user">
                  <FaUserNurse
                    className="icon-nurse"
                    style={{
                      fontSize: "30px",
                      marginRight: "5px",
                      marginBottom: "15px",
                    }}
                  />{" "}
                  Quản Lý Lịch Trình Bác Sĩ
                  <div className="sub-mn" onClick={this.handShowManageDoctor}>
                    Quản Lý Kế Hoạch Khám
                  </div>
                  <div className="sub-mn" onClick={this.handShowManagePatient}>
                    Quản Lý Bệnh Nhân Khám
                  </div>
                </div>
                <div className="mn-exit">
                  <a href="/" style={{ textDecoration: "none" }}>
                    <BiLogOut className="icon-logout" />
                    Thoát
                  </a>
                </div>
              </div>
            </div>
            <div className="content-right-admin">
              <div className="header-content-right-admin">
                <div className="title-manage-admin">Bác Sĩ Quản Lý</div>
                <div className="info-admin">
                  <FaUserCircle
                    style={{
                      fontSize: "30px",
                      marginRight: "5px",
                    }}
                  />{" "}
                  Bác Sĩ
                </div>
              </div>
              <div className="show-content-right-admin">
                {showManageDoctor === true ? <ManageSchedule /> : <></>}
                {showManagePatient === true ? <ManagePatient /> : <></>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
