import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./DoctorExtraInfor.scss";
import moment from "moment";

import { getExtraInforDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }


    render() {

        return (

            <>

            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
