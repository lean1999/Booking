import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
class ModelEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    };
  }
  toggle = () => {
    this.props.toggleUserModal();
  };

  componentDidMount() {
    let user = this.props.currentUser;
    console.log(user, "djask");
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hash",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
      });
    }
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing for:" + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleEditUser = () => {
    let isValid = this.checkValidInput();
    if (isValid === true) {
      //call API
      this.props.editUser(this.state);
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                disabled
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                disabled
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
              />
            </div>
          </div>
          <div className="modal-user-body">
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                placeholder="FirstName"
                value={this.state.firstName}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "firstName");
                }}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="LastName"
                value={this.state.lastName}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "lastName");
                }}
              />
            </div>
          </div>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Address</label>
              <input
                type="text"
                placeholder="Address"
                value={this.state.address}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
              />
            </div>
            <div className="input-container">
              <label>Phone Number</label>
              <input
                type="text"
                value={this.state.phoneNumber}
                placeholder="SDT"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "phoneNumber");
                }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: "orange" }}
            className="px-3"
            onClick={() => this.handleEditUser()}
          >
            Saves
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditUser);
