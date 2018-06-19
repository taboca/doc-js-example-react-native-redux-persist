import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './app/configStore'

import { Provider } from 'react-redux'
import Home  from './app/components/Home'

let persistor = null;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: configureStore(),
    };
    persistor = persistStore(this.state.store);
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider store={this.state.store}>
          <PersistGate loading={null} persistor={persistor}>
            <Home />
            </PersistGate>
        </Provider>
      </View>
    );
  }
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
