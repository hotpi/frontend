import React from 'react';

import ActionLabel from 'material-ui/svg-icons/action/label';

import {
  amber700,
  amber400,
  amber300,
  amber100,
  yellowA100,
  blueA100,
  blue800,
  teal200,
  lightGreen300,
  greenA100,
  orangeA100,
  cyanA100,
  grey400
} from 'material-ui/styles/colors';

export const importantColors = ['grey', amber700, amber400, amber100];
export const highlightColors = ['grey', yellowA100, blueA100, greenA100, orangeA100, cyanA100];
export const typeValues = [
  {
    type: 'new',
    title: 'New note'
  }, {
    type: 'diagnosis',
    title: 'Diagnosis'
  }, {
    type: 'history',
    title: 'History'
  }, {
    type: 'todo',
    title: 'ToDo'
  }
];

export const headerStylesDesktop = {
  height: '154px',
  backgroundColor: blue800,
  width: '76vw',
  left: '19.2em'
};

export const headerStylesMobile = {
  area: {
    backgroundColor: blue800
  },
  header3: {
    color: 'white',
    margin: '17px 0 8px 0',
    padding: '0px 0px 0 30px',
    fontWeight: 100
  },
  header2: {
    color: 'white',
    margin: 0,
    padding: '0 5px 0 30px',
    fontWeight: 400
  },
  line: {
    marginBottom: '0',
    color: 'white',
    border: '0',
    height: '1px',
    // eslint-disable-next-line
    backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0))'
  }
};

export const listStyle = {
  // width: '19.2em',
  height: '100vh',
  borderRight: '0.1em #d0d0d0 solid',
  marginRight: '0',
  marginTop: '0',
  paddingTop: '0',
  borderBottom: 'none',
  boxShadow: '3px 0 2px #aeaeae'
};

export const labelStyles = {
  infoItem: {
    padding: '1em 0',
    display: 'inline-block',
    backgroundColor: 'transparent'
  },

  info: {
    color: 'white',
    margin: '3px 0 0 0',
    fontWeight: '600'
  },

  label: {
    color: 'white',
    margin: '0',
    fontWeight: '200'
  }
};

export const titleArea = {
  hidden: {
    display: 'none'
  },
  visible: {
    textAlign: 'left',
    padding: '1em 0 1em 20px',
    margin: '0 0 0 20px',
    color: 'black',
    fontWeight: 100
  }
};

export const actionsArea = {
  hidden: {
    display: 'none'
  },
  visible: {
    maxWidth: '100%',
    margin: 0
  }
};

export const lineOutHover = {
  notLast: {
    margin: '0',
    padding: '0 1.5em 0 3em'
  },
  last: {
    padding: '0 1.5em 0 1em'
  }
};

export const iconStyles = {
  icon: {
    width: '18px',
    height: '18px',
    fontSize: '18px',
    color: 'grey'
  },
  iconArea: {
    width: '46px',
    height: '46px',
    padding: 0,
    marginRight: 5,
    marginLeft: 0,
    right: 13,
    bottom: 5
  }
};

export const newNoteButtonStyle = {
  margin: 20,
  position: 'fixed',
  top: '85%'
};

export const inlineIconStyle = Object.assign({}, iconStyles, {
  iconArea: {
    padding: 0,
    margin: 10,
    marginTop: 14,
    width: 20,
    height: 20
  }
});


export const clinic = (name) => {
  let nameInLowerCase = name.toLowerCase();
  switch (nameInLowerCase) {
  case 'endo':
    return {
      color: lightGreen300,
      name: 'Endo'
    };
  case 'all':
    return {
      color: teal200,
      name: 'All'
    };
  case 'pneu':
    return {
      color: amber300,
      name: 'Pneu'
    };
  default:
    return {
      color: grey400,
      name: ''
    };
  }
};

export const rightIconInfo = (clinicInfo) => {
  return (
    <div style={{
      margin: '0 12px'
    }}>
      <ActionLabel color={clinicInfo.color} />
      <h6 style={{
        margin: '0',
        color: clinicInfo.color
      }}>{clinicInfo.name}</h6>
    </div>
  );
};

export const dateToString = (date) => {
  if (typeof date !== 'object') {
    try {
      date = new Date(date);
    } catch (error) {
      throw new Error('TypeError: Date was expected to be either string, object or number');
      // console.log('TypeError: Date was expected to be either string, object or number')
    }
  }

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + '.' + month + '.' + year;
};
