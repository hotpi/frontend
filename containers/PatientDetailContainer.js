import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import {
green400,
cyan500,
blue800
} from 'material-ui/styles/colors';

import PatientOptionsList from '../components/lists/PatientOptionsList';
import PatientHeader from '../components/content/top-view/PatientHeader';
import Note from '../components/content/note/Note';
import Loading from '../components/helpers/Loading';

import { getIsFetching, getIsSynced } from '../reducers/index';
import { fetchData } from '../actions/sync';

class PatientDetailContainer extends React.Component {
  componentDidMount() {
    const { fetchData, isSynced } = this.props
    if (!isSynced) {
      fetchData()
    }
  }
  
  render() { 
    if (this.props.isLoading) {
      return <Loading />
    }
    
    return (
        <div style={{display: 'inline-flex'}}>
          <PatientOptionsList />
          <div style={{display: 'block', overflow: 'hidden'}}>
        		<PatientHeader />
            <Note type={this.props.params.type}/>
          </div>
        </div>
    	);
  }
}

const mapStateToProps = (state, { params }) => {
  return {
    isSynced: getIsSynced(state),
    isLoading: getIsFetching(state),
    type: params.type
  }
}

export default withRouter(connect(mapStateToProps, { fetchData })(PatientDetailContainer));
