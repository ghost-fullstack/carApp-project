import React, { PureComponent } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { BookingCard } from 'components/blocks'
import { Button } from 'components/ui'
import { colors } from 'theme'
import styles from './styles'

class HomeView extends PureComponent {
  keyExtractor = (item, index) => index.toString()

  renderEmptyList = () => {
    const {onNewPress} = this.props
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>You don't have any upcoming bookings.</Text>
        <TouchableOpacity onPress={onNewPress}>
          <Text style={[styles.emptyListText, {color: colors.red}]}>Create booking now</Text>
        </TouchableOpacity>
      </View>
    )
  }
  renderItem = ({item, index}) => {
    const {onBookingPress} = this.props
    return (
      <BookingCard
        booking={item.car}
        bookingEnd={item['booking_ending_at'].formatted}
        bookingStart={item['booking_starting_at'].formatted}
        extraDetail={`Starting ${item['booking_starting_at'].formatted}`}
        onPress={onBookingPress}
      />
    )
  }
  render () {
    const {bookings, onNewPress, isFetching} = this.props
    if (isFetching) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={colors.red} size='large' />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {
          bookings.length > 0
            ? (
              <FlatList
                data={bookings}
                extraData={bookings}
                keyExtractor={this.keyExtractor}
                renderItem={this.props.renderItem || this.renderItem}
              />
            ) : (
              this.renderEmptyList()
            )
        }
        <Button
          containerStyle={styles.button}
          title='NEW BOOKING'
          onPress={onNewPress}
        />
      </View>
    )
  }
}

HomeView.propTypes = {
  bookings: PropTypes.array,
  isFetching: PropTypes.bool,
  renderItem: PropTypes.func,
  onBookingPress: PropTypes.func,
  onNewPress: PropTypes.func
}

HomeView.defaultProps = {
  isFetching: false,
  bookings: []
}

export {HomeView}
