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
  'controller-nav': {
    'position': 'absolute',
    'left': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 30 }],
    'zIndex': '101',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'textAlign': 'center'
  }
});
