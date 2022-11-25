import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";

import { emitter } from "../../utils/emitter";
import ModelUser from "./ModelUser";
import ModelEditUser from "./ModelEditUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModel: false,
      isEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("All");
    if (response && response.err === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  handleAddNewUser = () => {
    this.setState({
      isOpenModel: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModel: !this.state.isOpenModel,
    });
  };
  toggleEditModal = () => {
    this.setState({
      isEditUser: !this.state.isEditUser,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.err !== 0) {
        alert(response.message);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModel: false,
        });
        emitter.emit("EVENT_CLEAR_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.err === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.err);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUser = (user) => {
    this.setState({
      isEditUser: true,
      userEdit: user,
    });
  };
  handleEdit = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.err === 0) {
        this.setState({
          isEditUser: false,
        });
        await this.getAllUsersFromReact();
      } else {
        alert(res.err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModelUser
          isOpen={this.state.isOpenModel}
          toggleUserModal={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isEditUser && (
          <ModelEditUser
            isOpen={this.state.isEditUser}
            toggleUserModal={this.toggleEditModal}
            currentUser={this.state.userEdit}
            editUser={this.handleEdit}
          />
        )}
        <div className="title text-center">Welcome to WebSide!</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fa fa-plus"></i>Add new user
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>Fist Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>SDT</th>
                <th>Action</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        <button
                          className="btn-edit"
                          type="button"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
