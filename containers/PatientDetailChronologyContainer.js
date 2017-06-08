import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import PatientOptionsList from '../components/lists/PatientOptionsList';
import PatientHeader from '../components/content/top-view/PatientHeader';
import Note from '../components/content/note/Note';

import { getDimensions } from '../reducers';

class PatientDetailChronologyContainer extends Component {
  constructor() {
    super();
    this.state = {
      isDrawerOpen: false
    };
  }

  handleClick() {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen
    });
  }

  render() {
    return (
      <div
        className="row"
        style={{
          margin: 0,
          maxWidth: '100%'
        }}
      >
        <div className="hide-for-small-only large-3 columns" style={{
          padding: 0
        }}
        >
          <PatientOptionsList
            reviewMode={true}
            width={this.props.width}
            isDrawerOpen={this.state.isDrawerOpen}
            onClickDo={this.handleClick.bind(this)}
          />
        </div>
        <div className="small-12 medium-8 large-9 columns" style={{
          padding: 0
        }}
        >
            <PatientHeader onClickDo={this.handleClick.bind(this)}/>
            <Note
              reviewMode={true}
              width={this.props.width}
              height={this.props.height - 150}
              type={this.props.type}
            />
        </div>
      </div>
    );
  }
}

PatientDetailChronologyContainer.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  type: PropTypes.string
};

const mapStateToProps = (state, { params }) => {
  const { width, height } = getDimensions(state);
  return {
    type: params.type,
    width,
    height
  };
};

export default withRouter(connect(mapStateToProps)(PatientDetailChronologyContainer));
