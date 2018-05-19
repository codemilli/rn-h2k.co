import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalLinkCount: 0,
      totalLogCount: 0,
    }
  }

  async componentDidMount() {
    const response = await Promise.all([
      fetch('https://api.h2k.co/links/count', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }),
      fetch('https://api.h2k.co/links/all/logs/count', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }),
    ])
    let [totalLinkCount, totalLogCount] = response
    totalLinkCount = (await totalLinkCount.json()).count
    totalLogCount = (await totalLogCount.json()).count

    this.setState({
      totalLinkCount,
      totalLogCount,
    })
  }

  render() {
    const {totalLinkCount, totalLogCount} = this.state

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <View>
            <View>
              <Text> Total Link Count : {totalLinkCount} </Text>
            </View>
            <View>
              <Text> Total Log Count : {totalLogCount} </Text>
            </View>
          </View>
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  cardWrapper: {
    flex: 1,
    padding: 12,
    justifyItems: 'center',
  }
});
