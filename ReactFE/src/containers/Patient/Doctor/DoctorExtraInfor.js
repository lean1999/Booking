import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./DoctorExtraInfor.scss";
import moment from "moment";

import { getScheduleDoctorByDate } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        };
    }

    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }
    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state;
        return (

            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">Phòng Khám Chuyên Khoa Gia Liễu</div>
                    <div className="detail-address">Trần Duy Hưng</div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false &&

                        <div className="">GIÁ KHÁM:
                            <span className="show-detail" onClick={() => this.showHideDetailInfo(true)}>Xem chi tiết</span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <div className="">

                            <div className="">GIÁ KHÁM</div>
                            <div className="">Giá Khám</div>
                            <div>Phương thức thanh toán</div>
                            <div>Note</div>
                            <div>
                                <span className="hide-detail" onClick={() => this.showHideDetailInfo(false)}>Ẩn bảng giá</span>
                            </div>
                        </div>}

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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
