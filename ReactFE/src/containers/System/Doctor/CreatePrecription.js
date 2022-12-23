import React, { Component } from "react";
import { connect } from "react-redux";
import Pdf from "react-to-pdf";
const ref = React.createRef();
class CreatePrecription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    return (
      <>
        <div className="App">
          <Pdf targetRef={ref} filename="code-example.pdf">
            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
          </Pdf>
          <div ref={ref}>
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePrecription);
