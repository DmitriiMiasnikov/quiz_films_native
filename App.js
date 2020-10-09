import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { MainScreen } from './src/screens/MainScreen';
import store from './src/store/store'


const Stack = createStackNavigator()
export default function App() {
  const stylesMainScreen = () => ({
    headerTitle: 'Главная страница',

  })
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={'Main'} component={MainScreen} options={stylesMainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
