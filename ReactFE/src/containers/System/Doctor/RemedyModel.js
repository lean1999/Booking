import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./RemedyModel.scss";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import { LANGUAGES, CommonUtils } from "../../../utils";
class RemedyModel extends Component {
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

  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    console.log(file);
    if (file) {
      let base64 = await CommonUtils.convertBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
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
            <h5 className="modal-title"> Gửi hóa đơn xác nhận</h5>
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
            <form>
              {" "}
              <div className="row">
                <div className="col-6 form-group">
                  <label>Email bệnh nhân</label>
                  <input
                    type="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={(event) => this.handleOnChangeEmail(event)}
                  />

                  <div className="col-12 form-group">
                    <label>Chọn file đơn thuốc</label>
                    <input
                      type="file"
                      className="form-control-file"
                      onChange={(event) => this.handleOnChangeImg(event)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSendRemedy()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModel);
