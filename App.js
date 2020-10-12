import { NavigationContainer, getFocusedRouteNameFromRoute, DrawerActions } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import { MainScreen } from './src/screens/MainScreen';
import store from './src/store/store';
import { AllQuizListScreen } from './src/screens/AllQuizListScreen';
import { FilmsQuizListScreen } from './src/screens/FilmsQuizListScreen';
import { SerialsQuizListScreen } from './src/screens/SerialsQuizListScreen';
import { AppHeaderIcon } from './src/components/AppHeaderIcon';
import { THEME } from './src/theme'
import { QuizScreen } from './src/screens/QuizScreen';

const getTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Main';
  switch (routeName) {
    case 'Main':
      return 'Main page';
    case 'AllQuiz':
      return 'All quiz';
    case 'FilmsQuiz':
      return 'Films quiz';
    case 'SerialsQuiz':
      return 'Serials quiz';
  }
}

const Drawer = createDrawerNavigator();
const Drawers = () => {
  const MainStyles = ({
    title: 'Main page',
    drawerIcon: ({ focused, color, size }) => {
      return <Ionicons name={'ios-menu'} size={25} color={color} />
    },
  })
  const AllQuizStyles = ({
    title: 'All quiz',
    drawerIcon: ({ focused, color, size }) => {
      return <Ionicons name={'ios-menu'} size={25} color={color} />
    },
  })
  const FilmsQuizStyles = ({
    title: 'Films quiz',
    drawerIcon: ({ focused, color, size }) => {
      return <Ionicons name={'ios-menu'} size={25} color={color} />
    },
  })
  const SerialsQuizStyles = ({
    title: 'Serials quiz',
    drawerIcon: ({ focused, color, size }) => {
      return <Ionicons name={'ios-menu'} size={25} color={color} />
    },
  })
  return (
    <Drawer.Navigator drawerOptions={{
      activeTintColor: THEME.MAIN_COLOR, inactiveTintColor: 'grey',
      activeBackgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : 'white',
    }} drawerContentOptions={{
      labelStyle: {
        fontSize: 20
      }
    }}>
      <Drawer.Screen name={'Main'} component={MainScreen} options={MainStyles} />
      <Drawer.Screen name={'AllQuiz'} component={AllQuizListScreen} options={AllQuizStyles} />
      <Drawer.Screen name={'FilmsQuiz'} component={FilmsQuizListScreen} options={FilmsQuizStyles} />
      <Drawer.Screen name={'SerialsQuiz'} component={SerialsQuizListScreen} options={SerialsQuizStyles} />
    </Drawer.Navigator>
  )
}

const Stack = createStackNavigator()
export default function App() {
  const stylesMainScreen = ({ route, navigation }) => ({
    headerTitle: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'open drower'} iconName={'ios-menu'} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        <Text style={styles.title}>{getTitle(route)}</Text>
      </HeaderButtons>
    ),
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: THEME.MAIN_COLOR
    },
  })
  const stylesQuizScreen = ({ route, navigation }) => ({
    headerTitle: route.params.quiz.title,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: THEME.MAIN_COLOR
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'go home'} iconName={'ios-home'} onPress={() => navigation.goBack()} />
      </HeaderButtons>
    ),
  })
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={'Drawers'} component={Drawers} options={stylesMainScreen} />
          <Stack.Screen name={'Main'} component={MainScreen} />
          <Stack.Screen name={'Quiz'} component={QuizScreen} options={stylesQuizScreen} />
          <Stack.Screen name={'AllQuiz'} component={AllQuizListScreen} />
          <Stack.Screen name={'FilmsQuiz'} component={FilmsQuizListScreen} />
          <Stack.Screen name={'SerialsQuiz'} component={SerialsQuizListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: Platform.OS === 'android' ? 'white' : THEME.MAIN_COLOR
  }
})