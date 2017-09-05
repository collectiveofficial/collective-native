import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Permissions } from 'expo';
import QrScanner from './src/qrScanner/QrScanner.js';
import { StackNavigator } from 'react-navigation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    return (
      <View style={styles.container}>
        <Text>Welcome to Collective!</Text>
        <QrScanner />
      </View>
    );
  }
}
