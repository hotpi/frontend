import React from 'react';

const EmptySelection = ({
  text
}) => {
  return (
    <div style={{margin: '8em 0 3em 10.3em', width: '50%', display: 'inline-flex'}}>
      <h3 style={{fontWeight: 100, fontSize: 40, color: 'grey', margin: 0, textAlign: 'center', width: 470, height: 'auto'}}> {text} </h3>
    </div>
  );
}

export default EmptySelection;