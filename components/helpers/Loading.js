import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => {
  let text = "Loading...";
 
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh'}}>
      <CircularProgress style={{marginBottom: '2rem'}} />
      <span style={{color: 'gray'}}>{text}</span>
    </div>
  );
}

export default Loading;