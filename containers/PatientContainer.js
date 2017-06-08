import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import PatientList from '../components/lists/PatientList';
import EmptySelection from '../components/helpers/EmptySelection';

import { getWidth } from '../reducers';

class PatientContainer extends Component {
  constructor() {
    super();
    this.state = {
      isDrawerOpen: false
    };
  }

  handleClick() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
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
          <div
            className="large-3 columns"
            style={{
              padding: 0
            }}
          >
            <PatientList
              width={this.props.width}
              onClickDo={this.handleClick.bind(this)}
              isDrawerOpen={this.state.isDrawerOpen}
            />
          </div>
          <div
            className="small-12 medium-8 large-9 columns"
            style={{
              padding: 0
            }}
            >
            <div style={{
              overflow: 'hidden'
            }}
            >
              <EmptySelection
                onClickDo={this.handleClick.bind(this)}
                text={'Please select a patient'}
              />
            </div>
          </div>
        </div>
    );
  }
}

PatientContainer.propTypes = {
  width: PropTypes.number,
  type: PropTypes.string
};

const mapStateToProps = (state, { params }) => {
  const width = getWidth(state);
  return {
    type: params.type,
    width
  };
};

export default withRouter(connect(mapStateToProps)(PatientContainer));
