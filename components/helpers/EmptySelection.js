import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

const EmptySelection = ({
  text,
  onClickDo
}) => {
  return (
    <div className="small-centered columns">
      <div className="small-4 show-for-small-only colums">
              <FlatButton
                  className="show-for-small-only"
                  backgroundColor={'grey'}
                  onTouchTap={onClickDo}
                  icon={<NavigationMenu color={'white'} />}
                  />
            </div>
      <h3 style={{
        fontWeight: 100,
        fontSize: 40,
        color: 'grey',
        padding: '10rem 2rem',
        textAlign: 'center',
        height: 'auto'
      }}> {text} </h3>
    </div>
  );
};

EmptySelection.propTypes = {
  text: React.PropTypes.string,
  onClickDo: React.PropTypes.func
};

export default EmptySelection;
