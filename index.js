import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

<View style={styles.mainContainer}>
      {devices.length == 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={startScan}
            style={styles.circleView}>
            <Text style={styles.boldTextStyle}>{displayText}</Text>
          </TouchableOpacity>
        </View>
      ) : Object.keys(connectedDevice).length != 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{marginBottom: 12, textAlign: 'center'}}>
            Tap button to disconnect device.
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={disconnectDevice}
            style={styles.circleView}>
            <Text style={styles.boldTextStyle}>{displayText}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          style={{flex: 1}}
          data={devices}
          keyExtractor={item => item.id.toString()}
          renderItem={items => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => connectDevice(items.item)}
              style={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderWidth: 1,
                borderRadius: 10,
              }}>
              <Text style={{color: 'black', fontSize: 18}}>
                {items.item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  circleView: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 250,
    borderRadius: 150,
    borderWidth: 1,
  },
  boldTextStyle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
