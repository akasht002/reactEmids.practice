import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  dateHolder: {
    flexDirection: 'column',
    width: [{ unit: '%H', value: 0.5 }]
  },
  'dateHolder:last-child': {
    textAlign: 'right',
    marginRight: [{ unit: 'px', value: 15 }]
  },
  SPBlackoutDate: {
    display: '-ms-flexbox',
    display: 'flex',
    position: 'relative',
    width: [{ unit: 'px', value: 200 }],
    flexDirection: 'row !important'
  },
  datelast: {
    marginLeft: [{ unit: 'px', value: 30 }]
  },
  'SPBlackoutDate date': {
    display: 'block'
  },
  bDayList: {
    lineHeight: [{ unit: 'px', value: 15 }]
  },
  bDayListLiContent: {
    width: [{ unit: '%H', value: 1 }],
    flexDirection: 'row',
    padding: [{ unit: 'px', value: 20 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
    borderTop: [{ unit: 'px', value: 1 }, { unit: 'string', value: 'solid' }, { unit: 'string', value: 'rgba(225,225,225,.4)' }]
  },
  'bDayListLiContent>SPCertificateContent': {
    width: [{ unit: '%H', value: 0.9 }]
  },
  'bDayListLiContent>SPIconEdit': {
    float: 'right'
  },
  'SPBlackoutItems SPIconEdit': {
    top: [{ unit: 'px', value: -27 }]
  },
  'liSPBlackoutItems:last-child>bDayListLiContent': {
    borderBottom: [{ unit: 'px', value: 1 }, { unit: 'string', value: 'solid' }, { unit: 'string', value: 'rgba(225,225,225,.4)' }]
  },
  bListForm: {
    width: [{ unit: '%H', value: 1 }],
    flex: '1'
  }
});
