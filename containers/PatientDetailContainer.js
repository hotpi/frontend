import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import PatientOptionsList from '../components/lists/PatientOptionsList';
import PatientHeader from '../components/content/top-view/PatientHeader';
import Note from '../components/content/note/Note';
import Loading from '../components/helpers/Loading';
import EmergencyCallButton from '../components/content/top-view/EmergencyCallButton';

import { getIsFetching, getIsSynced } from '../reducers/index';
import { fetchData } from '../actions/sync';

class PatientDetailContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isDrawerOpen: false,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  componentWillMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    // console.log('at container updates')
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    const { isSynced } = this.props;
    if (!isSynced) {
      this.props.fetchData();
    }
  }

  handleClick() {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen
    });
  }

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }

    return (
      <div
        className="row"
        style={{
          margin: 0, maxWidth: '100%'
        }}
      >
        <div className="hide-for-small-only large-3 columns" style={{
          padding: 0
        }}
        >
          <PatientOptionsList
            width={this.state.width}
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
              width={this.state.width}
              height={this.state.height - 150}
              type={this.props.type}
            />
        </div>
        <EmergencyCallButton width={this.state.width} />
      </div>
    );
  }
}

PatientDetailContainer.propTypes = {
  fetchData: React.PropTypes.func,
  isSynced: React.PropTypes.string,
  isLoading: React.PropTypes.bool,
  type: React.PropTypes.string
};

const mapStateToProps = (state, { params }) => {
  return {
    isSynced: getIsSynced(state),
    isLoading: getIsFetching(state),
    type: params.type
  };
};

export default withRouter(connect(mapStateToProps, { fetchData })(PatientDetailContainer));
