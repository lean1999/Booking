import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModelUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
      });
    });
  };
  toggle = () => {
    this.props.toggleUserModal();
  };

  componentDidMount() {
    console.log("mouting modal");
  }

  handleOnChangeInput = (event, id) => {
    // this.state[id] = event.target.value;
    // this.setState(
    //   {
    //     ...this.state,
    //   },
    //   () => {
    //     console.log(this.state);
    //   }
    // );
    // console.log("event:", event.target.value, id);

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
  handleAddNewUser = () => {
    let isValid = this.checkValidInput();
    if (isValid === true) {
      //call API
      this.props.createNewUser(this.state);
    }
    this.checkValidInput();
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>
          Create a new account
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
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
            color="primary"
            className="px-3"
            onClick={() => this.handleAddNewUser()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);
