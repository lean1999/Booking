import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }
  componentDidMount() {
    this.props.fetchUserRedux();

    console.log("check props 133", this.props.listUser);
  }
  render() {
    return (
      <table id="TableManageUser">
        <tbody>
          <tr>
            <th>Email</th>
            <th>Fist Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>SDT</th>
            <th>Action</th>
          </tr>

          <tr>
            <td>{"item.email"}</td>
            <td>{"item.firstName"}</td>
            <td>{"item.lastName"}</td>
            <td>{"item.address"}</td>
            <td>{"item.phoneNumber"}</td>
            <td>
              <button
                className="btn-edit"
                type="button"
                onClick={() => this.handleEditUser()}
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button
                className="btn-delete"
                onClick={() => this.handleDeleteUser()}
              >
                <i className="fas fa-trash"></i>
              </button>
            </td>
          </tr>

          {/* {arrUsers &&
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
            })} */}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
