import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

const HistoryNavigation = ({
  show,
  first,
  last,
  handleNavigation
}) => {
  if (!show) {
    return <div></div>;
  }

  return (
    <div style={{padding: '2em 0 0 17em'}}>
      <RaisedButton
        icon={<NavigationChevronLeft />}
        disabled={first}
        onClick={handleNavigation('left')}
        />
      <RaisedButton
        icon={<NavigationChevronRight />}
        disabled={last}
        onClick={handleNavigation('right')}
        />
    </div>
  );
}

export default HistoryNavigation;
