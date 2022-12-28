import React, { Component } from "react";
import { connect } from "react-redux";

import { postVerifyBookAppoiment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import "./VerifyEmail.scss";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    console.log(this.props);
    if (this.props.location && this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get("token");
      const doctorId = urlParams.get("doctorId");
      let res = await postVerifyBookAppoiment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { statusVerify, errCode } = this.state;
    console.log("state", this.state);
    return (
      <>
        <HomeHeader />
        <div className="verify-container">
          {" "}
          {statusVerify === false ? (
            <div>Loading data...</div>
          ) : (
            <div>
              {+errCode === 0 ? (
                <div className="info-booking">
                  Xác nhận lịch hẹn thành công ! Xin chờ Gmail Xác nhận{" "}
                </div>
              ) : (
                <div className="info-booking">
                  Lịch hẹn không tồn tại hoặc đã được xác nhận!
                </div>
              )}
            </div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
