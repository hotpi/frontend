import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import PatientList from './PatientList';
import PatientHeader from './PatientHeader';
import Note from './Note';
import Loading from './Loading';
import EmptySelection from './EmptySelection';

import { getIsFetching } from './reducers/index';
import { fetchData } from './actions/sync';

class PatientContainer extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props

    fetchData()
  }

  render() {
    if (this.props.isLoading) {
      return <Loading />
    }

    return (
        <div style={{display: 'inline-flex'}}>
          <PatientList />
          <div style={{display: 'block', overflow: 'hidden', marginTop: '5em'}}>
            <EmptySelection text={"Please select a patient"} />
        		{/*<PatientHeader />
            <Note type={this.props.type}/>*/}
          </div>
        </div>
    	);
  }
}

const mapStateToProps = (state, { params }) => {
  return {
    isLoading: getIsFetching(state),
    type: params.type
  }
}

export default withRouter(connect(mapStateToProps, { fetchData })(PatientContainer));
