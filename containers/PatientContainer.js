import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import PatientList from '../components/lists/PatientList';
import PatientHeader from '../components/content/top-view/PatientHeader';
import Note from '../components/content/note/Note';
import Loading from '../components/helpers/Loading';
import EmptySelection from '../components/helpers/EmptySelection';

import { getIsFetching, getIsSynced } from '../reducers';
import { fetchData } from '../actions/sync';

class PatientContainer extends React.Component {
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
          <div className="large-3 columns" style={{padding: 0}}>
            <PatientList isDrawerOpen={this.state.isDrawerOpen}/>
          </div>
          <div className="small-12 medium-8 large-9 columns" style={{padding:0}}>
            <div style={{overflow: 'hidden'}}>
              <EmptySelection 
                onClickDo={this.handleClick.bind(this)}
                text={"Please select a patient"} 
                />
            </div>
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

export default withRouter(connect(mapStateToProps, { fetchData })(PatientContainer));
