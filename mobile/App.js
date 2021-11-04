import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'react-native';

//import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Implemetação
import { store, persistor } from './src/store';

import MainStack from './src/stacks/MainStack';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar
            backgroundColor="#0465B2"
            barStyle="light-content" />
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );
}
export default App;

