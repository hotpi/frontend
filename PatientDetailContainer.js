import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import {
green400,
cyan500,
blue800
} from 'material-ui/styles/colors';

import PatientOptionsList from './PatientOptionsList';
import PatientHeader from './PatientHeader';
import Note from './Note';
import Loading from './Loading';

import { getIsFetching } from './reducers/index';
import { fetchData } from './actions/sync';

class PatientDetailContainer extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props

    fetchData()
  }
  
  render() {
    console.log(this.props.isLoading)
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
    isLoading: getIsFetching(state),
    type: params.type
  }
}

export default withRouter(connect(mapStateToProps, { fetchData })(PatientDetailContainer));
