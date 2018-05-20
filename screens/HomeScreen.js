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
      refreshing: true,
      totalLinkCount: 0,
      totalLogCount: 0,
    }
  }

  async componentDidMount() {
    this.onRefresh()
  }

  async getStatics() {
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

    return {
      totalLinkCount: (await totalLinkCount.json()).count || 0,
      totalLogCount:  (await totalLogCount.json()).count || 0,
    }
  }

  async onRefresh() {
    this.setState({refreshing: true})

    const statics = await this.getStatics()
    this.setState(Object.assign({refreshing: false}, statics))
  }

  render() {
    const {refreshing, totalLinkCount, totalLogCount} = this.state
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
          {refreshing ? null :
            <HomeMainStatic
              totalLinkCount={totalLinkCount}
              totalLogCount={totalLogCount}
            />
          }
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
