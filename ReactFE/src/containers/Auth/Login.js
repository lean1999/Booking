import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./Login.scss";
import * as actions from "../../store/actions";
// import { FormattedMessage } from "react-intl";
import { handleLoginAPI } from "../../services/userService";
class Login extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isShow: false,
      errorMessage: "",
    };
  }
  handleOnChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePaw = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errorMessage: "",
    });
    try {
      let data = await handleLoginAPI(this.state.username, this.state.password);
      if (data && data.error !== 0) {
        this.setState({
          errorMessage: data.message,
        });
      }

      if (data && data.err === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login success");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errorMessage: error.response.data.message,
          });
        }
      }
      console.log("error", error, error.message, error.response);
    }
  };
  handlesShow = () => {
    this.setState({ isShow: !this.state.isShow });
  };
  handlerKeyDown = (event) => {
    if (event.key === "Enter" || event.key === 13) {
      this.handleLogin();
    }
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">login</div>
            <div className="col-12 form-group login-input">
              <label>User name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) => {
                  this.handleOnChange(event);
                }}
              />
            </div>

            <div className="col-12 form-group login-input">
              <label>Password</label>
              <div className="custom-paw">
                <input
                  type={this.state.isShow ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => {
                    this.handleOnChangePaw(event);
                  }}
                  onKeyDown={(event) => {
                    this.handlerKeyDown(event);
                  }}
                />
                <span
                  onClick={() => {
                    this.handlesShow();
                  }}
                >
                  <i
                    className={
                      this.state.isShow ? "far fa-eye" : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>

            <div className="col-12" style={{ color: "red" }}>
              {this.state.errorMessage}
            </div>
            <div className="col-12 ">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12 ">
              <span className="forgot-paw">Forgot your password</span>
            </div>
            <div className="col-12 text-center">
              <span>Or Login with:</span>
            </div>
            <div className="col-12 social-login mt-3">
              <i className="fab fa-google-plus-g google "></i>
              <i className="fab fa-facebook-f facebook"></i>
              <i className="fab fa-twitter twitter"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
