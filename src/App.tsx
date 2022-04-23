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
import {StyleSheet, View} from 'react-native';
import {
  Provider as PaperProvider,
  Text,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
} from 'react-native-paper';
import VeggieDetailsScreen from './screens/VeggieDetailsScreen';
import VeggieListScreen from './screens/VeggieListScreen';
import Amplify from '@aws-amplify/core';
import awsConfig from './aws-exports';

Amplify.configure(awsConfig);

const Stack = createStackNavigator();

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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
