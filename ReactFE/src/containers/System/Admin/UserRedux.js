import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
// import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImg: "",
      isOpen: false,

      //Khoi tao
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: "",
      userEditId: "",
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gendersRedux !== this.props.gendersRedux) {
      //render lai gan value vao ben
      let arrGender = this.props.gendersRedux;
      this.setState({
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
      });
    }
    if (prevProps.positionsRedux !== this.props.positionsRedux) {
      //render lai gan value vao ben
      let arrPositions = this.props.positionsRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.rolesRedux !== this.props.rolesRedux) {
      let arrRoles = this.props.rolesRedux;
      //render lai gan value vao ben
      this.setState({
        roleArr: this.props.rolesRedux,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.listUser !== this.props.listUser) {
      let arrGender = this.props.gendersRedux;
      let arrPositions = this.props.positionsRedux;
      let arrRoles = this.props.rolesRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        avatar: "",
        previewImg: "",

        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",

        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // this.props.dispatch(actions.fetchGenderStart());
  }

  // try {
  //   let res = await getAllCodeService("gender");
  //   if (res && res.errCode === 0) {
  //     this.setState({
  //       genderArr: res.data,
  //     });
  //   }
  // } catch (e) {
  //   console.log(e);
  // }

  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    console.log(file);
    if (file) {
      let base64 = await CommonUtils.convertBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: objectUrl,
        avatar: base64,
      });
    }
  };
  openPreviewImg = () => {
    if (!this.state.previewImg) return;
    this.setState({
      isOpen: true,
    });
  };
  handleSaveUser = () => {
    let isValid = this.checkValidInput();
    if (isValid === false) return;

    let { action } = this.state;

    ///check action

    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      //redux edit
      this.props.editAUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  checkValidInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("input required :" + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      roleId: user.role,
      position: user.position,
      avatar: "",
      previewImg: imageBase64,
      action: CRUD_ACTIONS.EDIT,

      userEditId: user.id,
    });
  };

  render() {
    //gan biet cho mang
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;

    let language = this.props.language;
    let isGender = this.state.isLoadingGender;

    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      role,
      position,
      gender,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title "> User redux</div>
        <div className="col-12">
          {/* {isGender === true ? "loading gender" : "failed"} */}
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    this.onChangeInput(event, "email");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    this.onChangeInput(event, "password");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(event) => {
                    this.onChangeInput(event, "firstName");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(event) => {
                    this.onChangeInput(event, "lastName");
                  }}
                />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phone" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  value={gender}
                  onChange={(event) => {
                    this.onChangeInput(event, "gender");
                  }}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  value={position}
                  onChange={(event) => {
                    this.onChangeInput(event, "position");
                  }}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  value={role}
                  id="inputState"
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "role");
                  }}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-container-img">
                  <input
                    id="preview-img"
                    type="file"
                    hidden
                    onChange={(event) => {
                      this.handleOnChangeImg(event);
                    }}
                  />
                  <label className="label-upload" htmlFor="preview-img">
                    Tải Ảnh <i className="fa fa-upload"></i>
                  </label>
                  <div
                    className="preview-img"
                    style={{
                      backgroundImage: `url("${this.state.previewImg}")`,
                    }}
                    onClick={() => this.openPreviewImg()}
                  ></div>
                </div>
              </div>

              <div className="col-12 my-5">
                {" "}
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>

              <div className="col-12 mb-̀5">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImg}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoadingGender: state.admin.isLoadingGender,
    language: state.app.language,
    gendersRedux: state.admin.genders,
    positionsRedux: state.admin.positions,
    listUser: state.admin.users,
    rolesRedux: state.admin.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editAUserRedux: (data) => dispatch(actions.editAUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
