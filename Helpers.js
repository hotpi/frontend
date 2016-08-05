import {
  amber700,
  amber400,
  amber100,
  yellowA100,
  blueA100,
  blue800,
  lightBlue50,
  greenA100,
  orangeA100,
  cyanA100,
  grey400
} from 'material-ui/styles/colors'

export const importantColors = ["grey", amber700, amber400, amber100];
export const highlightColors = ["grey", yellowA100, blueA100, greenA100, orangeA100, cyanA100];
export const typeValues = ["New", "Diagnosis", "History", "ToDo"];

export const headerStylesDesktop = {
  height: '154px',
  backgroundColor: blue800,
  width: '76vw',
  left: '19.2em'
};

export const headerStylesMobile = {
  height: '154px',
  backgroundColor: blue800,
  width: '70vw',
  left: '19.2em'
};

export const listStyle = {
    width: '19.2em', 
    height: '100vh', 
    borderRight: '0.1em #d0d0d0 solid', 
    marginRight: '0',
    marginTop: '0',
    paddingTop: '0',
    borderBottom: 'none',
    boxShadow: '3px 0 2px #aeaeae'
};

export const titleArea = {
  hidden: {
    display: 'none'
  },
  visible: {
    padding: '1em 2em', 
    margin: '0', 
    color: 'black', 
    fontWeight: '200'
  }
};

export const actionsArea = {
  hidden: {
    display: 'none'
  },
  visible: {
    display: 'inline-flex',
    height: 65,
    padding: '0 1em 0 2em'
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
}

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

export const inlineIconStyle = Object.assign({}, iconStyles, {
  iconArea: {
    padding: 0,
    margin: 10,
    marginTop: 14,
    width: 20,
    height: 20
  }
});
