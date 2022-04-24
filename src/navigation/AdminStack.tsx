import {createStackNavigator} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import AuthContext from '../context/AuthContext';
import AddItemScreen from '../screens/AddItemScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import SignInScreen from '../screens/SignInScreen';

interface Props {}

const Stack = createStackNavigator();

const AdminStack = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const signInValue = useMemo(
    () => ({
      signedIn,
      setSignedIn,
    }),
    [signedIn, setSignedIn],
  );

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const authStatus = await Auth.currentAuthenticatedUser();
        console.log('authStatus', authStatus);
        setSignedIn(true);
      } catch (err) {
        console.log('error', err);
        setSignedIn(false);
      }
      setLoading(false);
    };
    getAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={signInValue}>
      <Stack.Navigator>
        {!signedIn ? (
          <Stack.Screen
            name="SignIn"
            options={{title: 'Sign In'}}
            component={SignInScreen}
          />
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              options={{title: 'Dashboard'}}
              component={AdminDashboardScreen}
            />
            <Stack.Screen
              name="AddItem"
              options={{title: 'Add Item'}}
              component={AddItemScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default AdminStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
