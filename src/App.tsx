/**
 *
 * @format
 */

import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  Provider as PaperProvider,
  Text,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
} from 'react-native-paper';
import VeggieDetailsScreen from './screens/VeggieDetailsScreen';
import VeggieListScreen from './screens/VeggieListScreen';
// import Amplify from '@aws-amplify/core';
// import Auth from '@aws-amplify/auth';
import awsConfig from './aws-exports';
// import AdminStack from './navigation/AdminStack';
import isWeb from './utils/isWeb';
// import AdminScreen from './screens/AdminScreen';
import {Amplify} from 'aws-amplify';
import AdminStack from './navigation/AdminStack';
import WebStyles from './utils/WebStyles';
import ToastState from './context/ToastState';
import Toast from './components/Toast';

export type RootStackParamList = {
  VeggieList: undefined;
  VeggieDetails: {id: string};
  Admin: any;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Amplify.configure(awsConfig);
// Auth.configure(awsConfig);

Amplify.configure({
  ...awsConfig,
  Analytics: {
    disabled: true,
  },
});

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [theme, setTheme] = useState(DefaultTheme);
  const paperTheme = useMemo(() => {
    const t = theme.dark ? PaperDarkTheme : PaperLightTheme;

    return {
      ...t,
      colors: {
        ...t.colors,
        ...theme.colors,
        surface: theme.colors.card,
        accent: theme.dark ? 'rgb(255, 55, 95)' : 'rgb(255, 45, 85)',
      },
    };
  }, [theme.colors, theme.dark]);

  const navigationRef = useNavigationContainerRef();

  return (
    <PaperProvider theme={paperTheme}>
      <WebStyles />
      <ToastState>
        <NavigationContainer
          fallback={<Text>Loading…</Text>}
          documentTitle={{
            formatter: (options, route) =>
              `${options?.title ?? route?.name} - Interesting Veggies`,
          }}
          ref={navigationRef}
          theme={theme}>
          <Stack.Navigator initialRouteName="VeggieList">
            <Stack.Screen
              name="VeggieList"
              options={{title: 'Veggies'}}
              component={VeggieListScreen}
            />
            <Stack.Screen
              name="VeggieDetails"
              options={{title: 'Details'}}
              component={VeggieDetailsScreen}
            />
            <Stack.Screen
              name="Admin"
              options={{title: 'Admin', headerShown: false}}
              component={AdminStack}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </ToastState>
    </PaperProvider>
  );
};

export default App;
