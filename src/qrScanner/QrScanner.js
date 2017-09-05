import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Permissions, BarCodeScanner } from 'expo';

export default class QrScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
    };
    this.checkCameraPermission = this.checkCameraPermission.bind(this);
    this.getCameraPermission = this.getCameraPermission.bind(this);
    this.handleBarCodeRead = this.handleBarCodeRead.bind(this);
  }

  async componentDidMount() {
    await this.checkCameraPermission();
    if (this.state.hasCameraPermission !== true) {
      await this.getCameraPermission();
    }
  }

  async checkCameraPermission() {
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    if (status === 'granted') {
      await this.setState({ hasCameraPermission: true });
    }
  }

  async getCameraPermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      await this.setState({ hasCameraPermission: true });
    } else {
      await this.setState({ hasCameraPermission: false });
    }
  }

  async handleBarCodeRead(dataObj) {
    const data = await JSON.parse(dataObj.data);
    const fetchURL = 'https://collective-web-pr-108.herokuapp.com/admin/pickup/checkoff-user';
    const response = await fetch(fetchURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        transactionID: data['Order ID'],
      }),
    });
    const responseData = await response.json();
    console.log('responseData: ', responseData);
    Alert.alert(
      'Scan successful!',
      JSON.stringify(responseData)
    );
  }

  render() {
    return (
      <View>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
              onBarCodeRead={this.handleBarCodeRead}
              style={{ height: 400, width: 300 }}
            />
        }
      </View>
    );
  }
}
