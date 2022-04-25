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
import {Provider as PaperProvider, Text} from 'react-native-paper';
import VeggieDetailsScreen from './screens/VeggieDetailsScreen';
import VeggieListScreen from './screens/VeggieListScreen';
import awsConfig from './aws-exports';
import isWeb from './utils/isWeb';
import {Amplify} from '@aws-amplify/core';
import AdminStack from './navigation/AdminStack';
import WebStyles from './utils/WebStyles';
import ToastState from './context/ToastState';
import Toast from './components/Toast';
import {darkTheme, lightTheme} from './utils/theme';
import ItemState from './context/ItemState';

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
    const t = theme.dark ? darkTheme : lightTheme;

    return {
      ...t,
      colors: {
        ...theme.colors,
        ...t.colors,
      },
    };
  }, [theme.colors, theme.dark]);

  const navigationRef = useNavigationContainerRef();

  return (
    <PaperProvider theme={paperTheme}>
      <WebStyles />
      <ItemState>
        <ToastState>
          <NavigationContainer
            linking={{
              prefixes: ['veggies://'],
              config: {
                screens: {
                  VeggieList: '',
                  VeggieDetails: 'details',
                  Admin: {
                    screens: {
                      SignIn: 'signin',
                      Dashboard: 'dashboard',
                      AddItem: 'add',
                    },
                  },
                },
              },
            }}
            fallback={<Text>Loading…</Text>}
            documentTitle={{
              formatter: (options, route) =>
                `${options?.title ?? route?.name} - Interesting Veggies`,
            }}
            ref={navigationRef}
            theme={theme}>
            <Stack.Navigator
              screenOptions={{headerBackTitleVisible: false}}
              initialRouteName="VeggieList">
              <Stack.Screen
                name="VeggieList"
                options={{title: 'Veggies', headerShown: false}}
                component={VeggieListScreen}
              />
              <Stack.Screen
                name="VeggieDetails"
                options={{title: 'Details'}}
                component={VeggieDetailsScreen}
              />
              {isWeb && (
                <Stack.Screen
                  name="Admin"
                  options={{title: 'Admin', headerShown: false}}
                  component={AdminStack}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
          <Toast />
        </ToastState>
      </ItemState>
    </PaperProvider>
  );
};

export default App;
