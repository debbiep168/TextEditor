// INLINE STYLING CONSTANTS & FUNCTIONS --- imported to Editor.js
var React = require('react');
var ReactDOM = require('react-dom');
import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black'];
var fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 72];
var fontStyles = ['TimesNewRoman', 'Arial', 'Helvetica', 'Courier'];

const styleMap = {
  //COLORS
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
  black: { color: 'black' },
  //FONT SIZE
  8: { fontSize: 8 },
  9: { fontSize: 9 },
  10: { fontSize: 10 },
  11: { fontSize: 11 },
  12: { fontSize: 12 },
  14: { fontSize: 14 },
  16: { fontSize: 16 },
  18: { fontSize: 18 },
  24: { fontSize: 24 },
  30: { fontSize: 30 },
  36: { fontSize: 36 },
  48: { fontSize: 48 },
  72: { fontSize: 72 },
  //FONT STYLE
  TimesNewRoman: { fontFamily: "Times New Roman" },
  Arial: { fontFamily: "Arial" },
  Helvetica: { fontFamily: "Helvetica" },
  Courier: { fontFamily: "Courier New" },
};

// custom block render map
const blockRenderMap = Map({
  'align-left': {
    wrapper: <div className='left'></div>
  },
  'align-center': {
    wrapper: <div className='center'></div>
  },
  'align-right': {
    wrapper: <div className='right'></div>
  }
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

module.exports = {
  extendedBlockRenderMap,
  colors,
  fontSizes,
  fontStyles,
  styleMap
}
