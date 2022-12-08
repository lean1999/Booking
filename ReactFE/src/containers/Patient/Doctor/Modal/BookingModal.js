import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./BookingModal.scss";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import { postPatientAppoiment } from "../../../../services/userService";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import { toast } from "react-toastify";
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            doctorId: '',
            selectedGender: '',
            timeType: ''
        };
    }

    async componentDidMount() {
        this.props.getGenders();

    }
    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {

            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }

    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })

    }
    handleOnchangeDatePiker = (date) => {
        this.setState({
            birthday: date[0],
        });
    }
    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }
    handleConfirmBooking = async () => {
        console.log('check confirm', this.state);
        // !data.email || !data.doctorId || !data.timeType || !data.date
        let date = new Date(this.state.birthday).getTime();
        let res = await postPatientAppoiment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType
        })
        if (res && res.errCode === 0) {
            toast.success('Bookign a new appoiment succedd');
            this.props.closeBookingClose();
        } else {
            toast.error('Bookign a new appoiment error')
        }
    }
    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        console.log('datatime', dataTime)
        console.log('data props from modal', this.props)
        console.log('check state onchange', this.state)
        // fullName: '',
        //     phoneNumber: '',
        //         email: '',
        //             address: '',
        //                 reason: '',
        //                     birthday: '',
        //                         gender: '',
        //                             doctorId: ''
        return (

            <>
                <Modal
                    isOpen={isOpenModal}
                    // toggle={}
                    className={"booking-modal-container"}
                    size="lg"
                    centered
                // backdrop={true}
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left"><FormattedMessage id={"patient.booking-modal.title"} /></span>
                            <span className="right" onClick={closeBookingClose}><i className="fas fa-times"></i></span>
                        </div>
                        <div className="booking-modal-body">
                            {/* {JSON.stringify(dataTime)} */}
                            <div className="doctor-infor">
                                <ProfileDoctor doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id={"patient.booking-modal.fullName"} /></label>
                                    <input className="form-control"
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')} />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id={"patient.booking-modal.phoneNumber"} /></label>
                                    <input className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id={"patient.booking-modal.email"} /></label>
                                    <input className="form-control"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id={"patient.booking-modal.address"} /></label>
                                    <input className="form-control"
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                                </div>
                                <div className="col-12 form-group">
                                    <label><FormattedMessage id={"patient.booking-modal.reson"} /></label>
                                    <input className="form-control"
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')} />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id={"patient.booking-modal.birthday"} /></label>
                                    <DatePicker
                                        onChange={this.handleOnchangeDatePiker}
                                        className="form-control"
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id={"patient.booking-modal.gender"} /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className=" btn-booking-confirm"
                                onClick={() => this.handleConfirmBooking()}><FormattedMessage id={"patient.booking-modal.btn-confirm"} /></button>
                            <button className=" btn-booking-cancel"
                                onClick={closeBookingClose}><FormattedMessage id={"patient.booking-modal.btn-cancel"} /></button>
                        </div>
                    </div>
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
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
