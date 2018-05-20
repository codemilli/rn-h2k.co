import React from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {HomeMainStatic} from "../components/HomeMainStatic/HomeMainStatic"

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      refreshing: false
    }
  }

  onRefresh() {
    this.setState({refreshing: true}, () => {
      requestAnimationFrame(() => {
        this.setState({refreshing: false})
      })
    })
  }

  render() {
    const {refreshing} = this.state
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
        >
          {refreshing ? null : <HomeMainStatic />}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
