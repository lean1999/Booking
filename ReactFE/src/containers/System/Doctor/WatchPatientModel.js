import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
// import "./WatchPatientModel.scss";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import { LANGUAGES, CommonUtils } from "../../../utils";
class WatchPatientModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModel) {
      this.setState({
        email: this.props.dataModel.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModel !== this.props.dataModel) {
      this.setState({
        email: this.props.dataModel.email,
      });
    }
  }
  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    let { isOpenModal, closeRemedyClose, dataModel, sendRemedy } = this.props;
    return (
      <>
        <Modal
          isOpen={isOpenModal}
          // toggle={}
          className={"booking-modal-container"}
          size="md"
          centered
          // backdrop={true}
        >
          <div className="modal-header">
            <h5 className="modal-title"> Form Thông tin Bệnh Nhân</h5>
            <button
              className="close"
              type="button"
              aria-label="Close"
              onClick={closeRemedyClose}
            >
              <span aria-hidden="true">x</span>
            </button>
          </div>
          <ModalBody>
            <form></form>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={() => this.handleSendRemedy()}>
              Send
            </Button>{" "}
            <Button color="secondary" onClick={closeRemedyClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchPatientModel);
