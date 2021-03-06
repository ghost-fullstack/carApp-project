
import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: 32,
    paddingTop: 5,
    justifyContent: 'space-between'
  },
  formContainer: {
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    flexGrow: 1
  },

  form: {
  },

  mainErrorText: {
    marginBottom: 5,
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: colors.red
  },

  resetButton: {
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: colors.red,
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: 10
  },
  footer: {
    alignItems: 'center'
  },
  button: {
    marginBottom: metrics.contentMargin,
    alignSelf: 'stretch'
  },
  mainText: {
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: colors.gray100
  },
  registerButtonText: {
    color: colors.red
  }
})
