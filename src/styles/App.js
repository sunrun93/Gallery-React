import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'html': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }],
    'backgroundColor': '#222'
  },
  'body': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }],
    'backgroundColor': '#222'
  },
  'content': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }]
  },
  'stage': {
    'position': 'relative',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': 'px', 'value': 520 }]
  },
  'image-sec': {
    'position': 'relative',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }],
    'overflow': 'hidden',
    'backgroundColor': '#ddd'
  },
  'image-sec img-figure': {
    'width': [{ 'unit': 'px', 'value': 300 }],
    'height': [{ 'unit': 'px', 'value': 340 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 30 }, { 'unit': 'px', 'value': 30 }, { 'unit': 'px', 'value': 30 }, { 'unit': 'px', 'value': 30 }],
    'boxSizing': 'border-box',
    'backgroundColor': '#fff',
    'position': 'absolute'
  },
  'image-sec img-figure img': {
    'width': [{ 'unit': 'px', 'value': 240 }],
    'height': [{ 'unit': 'px', 'value': 240 }]
  },
  'image-sec figcaption': {
    'textAlign': 'center'
  },
  'image-sec img-title': {
    'margin': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'color': '#a7a0a2',
    'fontSize': [{ 'unit': 'px', 'value': 16 }]
  },
  'controller-nav': {
    'position': 'absolute',
    'left': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 30 }],
    'zIndex': '101',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'textAlign': 'center'
  }
});
