import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";

import Select from "react-select";

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctor: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorsRedux();
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let language = this.props.language;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = ` ${item[index].firstName} ${item[index].lastName}`;
        let labelEn = ` ${item[index].lastName} ${item[index].firstName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item[index].id;
        result.push(object);
      });
    }
    console.log("check result", result);
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      console.log("check data", dataSelect);
      this.setState({
        listDoctor: this.props.allDoctors,
      });
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    console.log("click", this.state);
  };
  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };
  handleOnChangeDes = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    console.log("check state", this.state);
    console.log("check props", this.props);
    console.log("check doctor", this.state.listDoctor);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title"> Tạo Thêm Thông Tin Bác Sĩ</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label> Chọn Bác Sĩ</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
              options={this.state.listDoctor}
            />
          </div>
          <div className="content-right">
            <label className="">Thông Tin Giới Thiệu</label>
            <textarea
              className="form-control"
              rows="5"
              onChange={(event) => this.handleOnChangeDes(event)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <label>Tiểu Sử Bác Sĩ</label>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className="save-content-doctor"
        >
          Lưu Thông Tin
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: (id) => dispatch(actions.fetchAllDoctors(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
