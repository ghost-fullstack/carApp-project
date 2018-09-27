import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
// import Switch from 'react-native-switch-pro'
import PropTypes from 'prop-types'
import { NavButton, Button } from 'components/ui'
import { BookingDetail, CarImage, SectionTitle } from 'components/blocks'
import {Home, BookingConfirmed} from 'navigation/routeNames'
import {getNext24hours, isBetweenLimits} from 'helpers/date'
import styles from './styles'
import { colors } from 'theme'

const SLOT_HEIGHT = 34
const GAP_HEIGHT = 6

class TimeSlot extends PureComponent {
  onPress = () => {
    this.props.onPress(this.props.time)
  }
  render () {
    const {time, slotType} = this.props
    let backgroundColor = colors.gray50
    let textColor = colors.gray300
    if (slotType === 'border') {
      backgroundColor = colors.red
      textColor = colors.white
    } else if (slotType === 'middle') {
      backgroundColor = colors.pink
      textColor = colors.white
    }
    return (
      <TouchableOpacity style={[styles.timeSlot, {backgroundColor}]} onPress={this.onPress}>
        <Text style={[styles.timeSlotText, {color: textColor}]}>{time.label}</Text>
      </TouchableOpacity>
    )
  }
}

TimeSlot.propTypes = {
  slotType: PropTypes.string,
  time: PropTypes.object,
  onPress: PropTypes.func
}

class NewBookingDetails extends PureComponent {
  constructor (props) {
    super(props)
    let timeSlots = getNext24hours()
    console.log(timeSlots)
    this.state = {
      slots: timeSlots, // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      slotsNumToShow: 8,
      startTime: {value: null, label: '00:00'},
      endTime: {value: null, label: '00:00'},
      tapTurn: 0,
      enableScrollViewScroll: true
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NavButton icon='cancel' imageStyle={{height: 12, width: 12}} onPress={() => navigation.navigate(Home)} />
    }
  }

  onConfirmPress = () => {
    this.props.navigation.navigate(BookingConfirmed)
  }

  onSwitchBookHours = (addExtraHours) => {
    this.setState({
      slotsNumToShow: addExtraHours ? 12 : 8
    })
  }

  onTimeSlotPress = (timeslot) => {
    this.setState(prevState => {
      return {
        startTime: prevState.tapTurn === 0 ? timeslot : prevState.startTime,
        endTime: prevState.tapTurn === 1 ? timeslot : prevState.endTime,
        tapTurn: prevState.tapTurn === 1 ? 0 : 1
      }
    })
  }

  onViewableSlotsChanged = ({viewableItems, changed}) => {
    // console.log({viewableItems, changed})
  }

  enableContainerScroll = () => {
    this.setState({ enableScrollViewScroll: true })
  }

  enableTimeslotsScroll = () => {
    this.setState({ enableScrollViewScroll: false })
    if (this._myScroll.contentOffset === 0 && this.state.enableScrollViewScroll === false) {
      this.setState({ enableScrollViewScroll: true })
    }
  }

  keyExtractor = (item, index) => index.toString()

  renderSeparator = () => {
    return <View style={styles.listSeparator} />
  }
  renderSlot = ({item}) => {
    let slotType = 'default'
    const {endTime, startTime} = this.state
    if (item.value === endTime.value || item.value === startTime.value) slotType = 'border'
    else if (startTime.value && endTime.value && isBetweenLimits(startTime.value, endTime.value, item.value)) slotType = 'middle'
    console.log('sloType', slotType)
    return (
      <TimeSlot slotType={slotType} time={item} onPress={this.onTimeSlotPress} />
    )
  }

  render () {
    const {slotsNumToShow, slots, startTime, endTime} = this.state
    console.log(this.state.startTime, this.state.endTime)
    let timeSlotContainerHeight = (SLOT_HEIGHT * slotsNumToShow) + (GAP_HEIGHT * (slotsNumToShow - 1))
    return (
      <View
        onStartShouldSetResponderCapture={this.enableContainerScroll}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          // nestedScrollEnabled
          ref={myScroll => (this._myScroll = myScroll)}
          scrollEnabled={this.state.enableScrollViewScroll}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <CarImage />
            <View style={styles.bookingDetailsList}>
              <View style={[styles.row, {marginBottom: 16}]}>
                <View style={{flex: 1}}>
                  <View style={{marginBottom: 16}}>
                    <BookingDetail
                      label='Car Make'
                      text='Toyota'
                    />
                  </View>
                  <BookingDetail
                    label='Color'
                    text='White'
                  />
                </View>
                <View style={{flex: 1}}>
                  <View style={{marginBottom: 16}}>
                    <BookingDetail
                      label='Year'
                      text='2016'
                    />
                  </View>
                  <BookingDetail
                    label='Model'
                    text='Prius'
                  />
                </View>
              </View>
              <View style={{marginBottom: 16}}>
                <BookingDetail
                  label='Pickup location'
                  text='Bronx'
                />
              </View>
              <View style={{marginBottom: 16}}>
                <BookingDetail
                  label='Return location'
                  text='Manhattan'
                />
              </View>
            </View>
            <View style={styles.scheduleContainer}>
              <SectionTitle title='SCHEDULE' />
              {/* <View style={styles.switchContainer}>
                <Switch
                  backgroundActive={colors.red}
                  backgroundInactive='#E5E5E5'
                  circleColorActive={colors.white}
                  height={31}
                  width={51}
                  onSyncPress={this.onSwitchBookHours}
                />
                <Text style={styles.switchText}>Book extra hours</Text>
              </View> */}
              <View style={[styles.row, {marginVertical: 16}]}>
                <View style={{flex: 1}}>
                  <BookingDetail
                    label='Start Time'
                    text={startTime.label}
                  />
                </View>
                <View style={{flex: 1}}>
                  <BookingDetail
                    label='End Time'
                    text={endTime.label}
                  />
                </View>
              </View>
              <View
                style={{height: timeSlotContainerHeight}}
                onStartShouldSetResponderCapture={this.enableTimeslotsScroll}
              >
                <FlatList
                  ItemSeparatorComponent={this.renderSeparator}
                  data={slots}
                  extraData={{startTime: this.state.startTime, endTime: this.state.startTime}}
                  keyExtractor={this.keyExtractor}
                  // nestedScrollEnabled
                  renderItem={this.renderSlot}
                  showsVerticalScrollIndicator={false}
                  onViewableItemsChanged={this.onViewableSlotsChanged}
                />
              </View>
            </View>
            <Button
              containerStyle={styles.button}
              title='CONFIRM'
              onPress={this.onConfirmPress}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}
NewBookingDetails.propTypes = {
  navigation: PropTypes.object
}

export default NewBookingDetails