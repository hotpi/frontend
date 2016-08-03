import React from 'react';

import _ from 'lodash';

import { createStore } from 'redux';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';

import {
  amber700,
  amber400,
  amber100,
  yellowA100,
  blueA100,
  lightBlue50,
  greenA100,
  orangeA100,
  cyanA100,
  grey400
} from 'material-ui/styles/colors'

import NoteLineOptions from './NoteLineOptions'

export const importantColors = ["transparent", amber700, amber400, amber100];
export const highlightColors = ["transparent", yellowA100, blueA100, greenA100, orangeA100, cyanA100];

const lineOutHover = {
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

const inlineIconStyle = Object.assign({}, iconStyles, {
  iconArea: {
    padding: 0,
    margin: 10,
    marginTop: 14,
    width: 20,
    height: 20
  }
});

const noteLineOptions = (state = {
  important: {
    set: false,
    color: "transparent",
    value: 0
  },
  highlight: {
    set: false,
    color: "transparent",
    value: 0
  }
}, action ) => {
  console.log('dispatching: ', action.type)
  switch (action.type) {
    case 'HIGHLIGHT':
      return {
        ...state,
        highlight: {
          set: +action.value !== 0,
          color: action.color,
          value: action.value
        }
      }
    case 'IMPORTANT':
      return {
        ...state,
        important: {
          set: +action.value !== 0,
          color: action.color,
          value: action.value
        }
      }
    default:
      return state
  }
}

const store = createStore(noteLineOptions);

store.subscribe(() =>
  console.log(store.getState())
)

export default class NoteLine extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      line: props.line,
      isEmpty: props.line.text === '' ? true : false,
      last: props.last,
      options: {
        important: {
          set: false,
          color: "transparent",
          value: 0
        },
        reminder: {
          set: false,
          value: "21/12/1991"
        },
        highlight: {
          set: false,
          value: 0,
          color: "transparent"
        }
      }
    }
  }

  componentDidMount() {
    if (this.props.canGetFocus) {
      this._input.focus();
    }
  }

  /*componentWillUpdate() {
    console.log('current state: ', store.getState());
  }*/

  isHighlighted() {
    return this.state.options.highlight.set;
  }

  isImportant() {
    return this.state.options.important.set;
  }

  updateOptions(optionsToUpdate) {
    let options = {important: this.state.options.important, highlight: this.state.options.highlight, reminder: this.state.options.reminder}
    let optionsUntouched = _.omit(options, _.keys(optionsToUpdate));
    let newOptions = _.assign(optionsUntouched, optionsToUpdate);

    this.setState({options: newOptions})
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();  

      if (!this.state.last) {
        return this.props.appendNewLineNext();
      }
    } else if (!e.ctrlKey && !e.altKey && e.keyCode === 8 && this.state.line.text.length === 0) {
      e.preventDefault();

      if (!this.state.last) {
        return this.props.deleteLine();
      }
    } 
  }

  handleChange(e) {
    if (this.state.isEmpty && this.state.last) {
      this.setState({
        last: false,
        isEmpty: false
      });
      this.props.appendNewLineEnd();
    } 

    this.setState({isEmpty: e.target.value === ''});

    this.setState({
      line: {
          ID: this.state.line.ID,
          text: e.target.value
      }
    }); 
  }

  handleClickDelete(e) {
    this.props.deleteLine();
  }

  getLine() {
    return (
    <TextField 
      onChange={this.handleChange.bind(this)}
      onKeyDown={this.handleKeyDown.bind(this)}
      hintText={'Write here to start a new line'}
      rows={1}
      ref={(c) => this._input = c}
      multiLine={true}
      underlineShow={false} 
      textareaStyle={{paddingBottom: 0, backgroundColor: this.isHighlighted() ? this.state.options.highlight.color : 'transparent'}}
      inputStyle={{margin: 0, padding: 0}}
      style={{marginRight: 0, marginTop: 0, width: '94%'}} 
      value={this.state.line.text}>
    </TextField>
    );
  }

  renderLine() {
    if (this.isImportant()) {
      return (
        <Badge 
            badgeContent={+this.state.options.important.value}
            style={{width: '94%', margin: 0, padding: 0}}
            badgeStyle={{backgroundColor: this.state.options.important.color, left: 343, margin: 0, padding: 0}}
            >
            {this.getLine()}
        </Badge>
        )
    } 

    return this.getLine();
  }

  renderLineOptions() {
    if (!this.state.last) {
      return <NoteLineOptions

                store={ store }

                onHighlight={(e, value) => store.dispatch({
                    type: 'HIGHLIGHT', 
                    color: highlightColors[+value],
                    value: value                    
                  })
                }
                onImportant={(e, value) => store.dispatch({
                    type: 'IMPORTANT',
                    color: importantColors[+value],
                    value: value
                  })
                }
                />
    }
  }

  renderCancelButton() {
    if (!this.state.last) {
      return (
        <IconButton
          tooltip="Delete line"
          className="line-buttons"
          style={inlineIconStyle.iconArea} 
          iconStyle={inlineIconStyle.icon} 
          onClick={this.handleClickDelete.bind(this)} >
          <NavigationCancel />
        </IconButton>
      );
    }
  }

  renderAddIcon() {
    if (this.state.last) {
      return (
        <ContentAdd style={{left: 5, height: 18, width: 18, color: 'grey', paddingTop: 13, paddingRight: 2, marginRight: 5, marginLeft: 5}}/>
      );
    }
  }

  render() {
    return (
      <div className="note-line-container" style={this.state.last ? lineOutHover.last : lineOutHover.notLast}>
        <div className="line-w-button" tabIndex="0">
          {this.renderAddIcon()}

          {this.renderLine()}

          {this.renderCancelButton()}
          
        </div>

        {this.renderLineOptions()}
        
      </div>
    );
  }
}

NoteLine.propTypes =  {
    line: React.PropTypes.shape({
      ID: React.PropTypes.number.isRequired,
      text: React.PropTypes.string
    })
};

NoteLine.defaultProps = { 
  line: {
    text: ''
  }
};
