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
  constructor() {
    super()
    this.state = {
      isDrawerOpen: false
    }
  }

  componentDidMount() {
    const { fetchData, isSynced } = this.props
    if (!isSynced) {
      fetchData()
    }
  }

  handleClick(e) {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen
    })
  }
  
  render() { 
    if (this.props.isLoading) {
      return <Loading />
    }
    
    return (
      <div className="row" style={{margin: 0, maxWidth: '100%'}}>
        <div className="hide-for-small-only large-3 columns" style={{padding: 0}}>
          <PatientOptionsList isDrawerOpen={this.state.isDrawerOpen}/>
        </div>
        <div className="small-12 medium-8 large-9 columns" style={{height: '100%', padding:0, overflow: 'hidden', position: 'relative'}}>
        		<PatientHeader onClickDo={this.handleClick.bind(this)}/>
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
