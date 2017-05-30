/**
 * @deprecated Will be removed in the next version
 */

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
    return null;
  }

  return (
    <div style={ { padding: '2em 0 0 17em' } }>
      <RaisedButton
        icon={<NavigationChevronLeft />}
        disabled={first}
        onTouchTap={handleNavigation('left')}
        />
      <RaisedButton
        icon={<NavigationChevronRight />}
        disabled={last}
        onTouchTap={handleNavigation('right')}
        />
    </div>
  );
};

HistoryNavigation.propTypes = {
  show: React.propTypes.bool,
  first: React.propTypes.bool,
  last: React.propTypes.bool,
  handleNavigation: React.propTypes.func
};

export default HistoryNavigation;
