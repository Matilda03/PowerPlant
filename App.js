import * as React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BleManager } from 'react-native-ble-plx'

const _BleManager = new BleManager();

function HomeScreen({ navigation }) {
  return (
    <View style={{flex: 1, padding: 20, flexDirection: 'column'}}>   
    <View style={{ flex: 2, alignItems: 'stretch', justifyContent: 'flex-start' }}>
      <Text>Home Screen</Text>
      <Button
        title="Connect"
        onPress={() => navigation.navigate('Details')}
      />
      <View style= {{flexDirection: 'row', flex: 1, flexWrap: 'wrap', alignItems: 'stretch', justifyContent: 'space-between', padding: 20}}>
        <View style={styles.greenButton}>
          <Text style={{color: 'white'}}>Plant 1</Text>
        </View>
        <View style={styles.greenButton}>
          <Text style={{color: 'white'}}>Plant 2</Text>
        </View>
        <View style={styles.greenButton}>
          <Text style={{color: 'white'}}>Plant 3</Text>
        </View>
      </View>
    </View>
    <View style={{flex: 1, padding: 20, marginTop: 40 }}>
      <Text>
        The plant was last watered at 9:00 AM.
      </Text>
      <Text>
        The light has been turned ON for 2 hours.
      </Text>
    </View>
    <View style={{flex: 1, padding: 20, justifyContent: 'space-between'}}>
      <Button
        title= "Learn more"
        
      />
      <Button
        title= "Home"
        
      />
      <Button
        title= "Profile"
        
      />
    </View>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Connect to PowerPlant</Text>
    </View>
  );
}
const startScan = () => {
  _BleManager.startDeviceScan(Null, {
    allowDuplicates: false,
    },
    async (error, device) => {
      setDisplaText('Scanning...');
      if (error) {
        _BleManager.stopDeviceScan();
      }
      console.log(device.localName, device.name);
      if (device.localName == 'Test' || device.name == 'Test') {
        setDevices([...devices, device]);
        _BleManager.stopDeviceScan();} }, );};

const connectDevice = device => {
  _BleManager.stopDeviceScan();
_BleManager.connectToDevice(device.id).then(async device => {
             await device.discoverAllServicesAndCharacteristics();
             _BleManager.stopDeviceScan();
             setDisplaText(`Device connected\n with ${device.name}`);
              setConnectedDevice(device);
                   setDevices([]);
  device.services().then(async service => {
      for (const ser of service) {
          ser.characteristics().then(characteristic => {
          getCharacteristics([...characteristics, characteristic]);
          });
  }
});
});
};

const disconnectDevice = () => {
  connectedDevice.cancelConnection();
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  greenButton: {
    borderRadius: 10,
    width: 150,
    height: 150,
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;
