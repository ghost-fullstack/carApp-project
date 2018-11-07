import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native'
import { DatePicker as CustomDatePicker } from 'react-native-wheel-picker-android'
import PropTypes from 'prop-types'

import moment from 'moment'

import styles from './styles'

class DatePicker extends PureComponent {
  state = {
    isOpen: false,

    animation: new Animated.Value(0)
  }

  handleOpen = () => {
    const { isOpen, animation } = this.state

    const initialValue = isOpen ? 216 : 0
    const finalValue = isOpen ? 0 : 216

    this.setState({
      isOpen: !isOpen
    })

    animation.setValue(initialValue)
    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      easing: Easing.linear
    }).start()
  }

  handleChange = nextDate => {
    const { onChange, type } = this.props

    onChange(moment(nextDate).format(), type)
  }

  render() {
    const { animation } = this.state

    const { value, type, formatter, style, startDate } = this.props

    return (
      <View style={[styles.container, style]}>
        <TouchableWithoutFeedback onPress={this.handleOpen}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{type}</Text>
            <Text style={styles.headerDate}>
              {moment(value).format(formatter)}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            height: animation,
            overflow: 'hidden',
            zIndex: 0
          }}
        >
          <CustomDatePicker
            initDate={new Date(value)}
            startDate={startDate ? new Date(startDate) : new Date()}
            style={{
              width: '100%',
              height: 216
            }}
            onDateSelected={this.handleChange}
          />
        </Animated.View>
      </View>
    )
  }
}

DatePicker.propTypes = {
  formatter: PropTypes.string,
  startDate: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default DatePicker