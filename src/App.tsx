/**
 *
 * @format
 */

import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import React, {useMemo, useState} from 'react';
import {Appbar, Provider as PaperProvider, Text} from 'react-native-paper';
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
import {Image, StyleSheet, View} from 'react-native';

export type RootStackParamList = {
  VeggieList: undefined;
  VeggieDetails: {id: string};
  Admin: any;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

Amplify.configure({
  ...awsConfig,
  Analytics: {
    disabled: true,
  },
});

const Stack = createStackNavigator<RootStackParamList>();

const Header = (props: StackHeaderProps) => {
  const title =
    props.options?.title && props.options.title !== 'Veggies'
      ? props.options.title
      : 'Veggies!';
  return (
    <Appbar.Header>
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : (
        <View style={{width: 35}} />
      )}
      <Appbar.Content title={title} />
      <Image style={styles.logo} source={require('./assets/images/logo.png')} />
    </Appbar.Header>
  );
};

const App = () => {
  const [theme] = useState(DefaultTheme);
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
              screenOptions={{
                headerBackTitleVisible: false,
                header: headerProps => <Header {...headerProps} />,
              }}
              initialRouteName="VeggieList">
              <Stack.Screen
                name="VeggieList"
                options={{
                  title: 'Veggies',
                }}
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

const styles = StyleSheet.create({
  logo: {
    height: 35,
    width: 35,
    borderRadius: 35,
    marginRight: 8,
  },
});
