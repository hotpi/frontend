import React from 'react';

import ContentAdd from 'material-ui/svg-icons/content/add';

export const AddIcon = ({last}) => {
  if (last) {
    return <ContentAdd style={{left: 5, height: 18, width: 18, color: 'grey', paddingTop: 13, paddingRight: 2, marginRight: 5, marginLeft: 5}}/>
  } 
  return (
    <div style={{display: 'none'}}></div>
  );
}