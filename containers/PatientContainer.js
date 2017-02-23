import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import PatientList from '../components/lists/PatientList';
import PatientHeader from '../components/content/top-view/PatientHeader';
import Note from '../components/content/note/Note';
import Loading from '../components/helpers/Loading';
import EmptySelection from '../components/helpers/EmptySelection';
import EmergencyCallButton from '../components/content/top-view/EmergencyCallButton';

import { getIsFetching, getIsSynced } from '../reducers';
import { fetchData } from '../actions/sync';

class PatientContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      isDrawerOpen: false,
      width: window.innerWidth
    }
  } 
  componentWillMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentDidMount() {
    const { fetchData, isSynced } = this.props

    if (!isSynced) {
      fetchData()
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
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
            <PatientList width={this.state.width} onClickDo={this.handleClick.bind(this)} isDrawerOpen={this.state.isDrawerOpen}/>
          </div>
          <div className="small-12 medium-8 large-9 columns" style={{padding:0}}>
            <div style={{overflow: 'hidden'}}>
              <EmptySelection 
                onClickDo={this.handleClick.bind(this)}
                text={"Please select a patient"} 
                />
            </div>
          </div>
          <EmergencyCallButton width={this.state.width} />
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
