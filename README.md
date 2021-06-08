# Study note - React Native Redux with Redux-persist

* https://leanpub.com/doc-js
* If you want to contribute to the book or join me as a coauthor pool, please get in contact mgalli at mgalli dot com subject "doc-js book"

# This expands a prior React Redux app to have a persist store using redux-persist

Make you you check the [Example of React Native Redux app bringing a collection of products to the screen](https://github.com/taboca/doc-js-example-react-native-redux-join-jogic-store).

If you have not setup your infrastructure for launching React Native, check the session/chapter for that (make sure you have $ create-react-native-app in your path and working).


```
cd mySimpleClientJoinStore
```

Let's install redux
```
npm install
```

## Modification to the configStore

Was
```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../app/reducers/index';

export default createStore(reducers, applyMiddleware(thunk));
```

Became

```
import { createStore, applyMiddleware} from 'redux';
import { persistStore, autoRehydrate, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from '../app/reducers/index';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore() {
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  return store;
}
```

### Modification to the App.js

Before:
```
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import store from './app/configStore'
import { Provider } from 'react-redux'
import Home  from './app/components/Home'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <Home />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```

After:

```
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import configureStore from './app/configStore'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

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

```

## References

* https://github.com/rt2zz/redux-persist
