import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export class HomeMainStatic extends React.Component {

  mounted = true

  constructor(props) {
    super(props)

    this.state = {
      totalLinkCount: 0,
      totalLogCount: 0,
    }
  }

  async componentDidMount() {
    const {totalLinkCount, totalLogCount} = this.props

    this.increaseGradually('totalLinkCount', totalLinkCount, 600)
    this.increaseGradually('totalLogCount', totalLogCount, 600)
  }

  componentWillUnmount() {
    this.mounted = false
  }

  increaseGradually(key, target, dur) {
    const start = Date.now()
    const initialValue = this.state[key]

    const frame = (progress) => {
      requestAnimationFrame(() => {
        if (!this.mounted) {
          return
        }

        const timeDiff = Date.now() - start
        let progress = timeDiff / dur
        progress = progress * (progress * progress) // ease in cubic

        if (progress >= 1) {
          return this.setState({
            [key]: target,
          })
        } else {
          this.setState({
            [key]: parseInt(initialValue + (target * progress)),
          })
          frame(progress)
        }
      })
    }

    frame(0)
  }

  render() {
    const {totalLinkCount, totalLogCount} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../../assets/images/robot-dev.png')
                : require('../../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.cardWrapper}>
            <Text> Total Link Count : {totalLinkCount} </Text>
          </View>
          <View style={styles.cardWrapper}>
            <Text> Total Log Count : {totalLogCount} </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  contentWrapper: {
    flex: 1,
    flexDirection: 'column',
    padding: 12,
  },
  cardWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
