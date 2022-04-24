import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SignIn} from 'aws-amplify-react-native';

interface Props {
  authState?: string;
  authData?: any;
}

const AdminArea = ({authData, authState}: Props) => {
  if (authState !== 'signedIn') return null;
  return (
    <View style={styles.container}>
      <Text>{authState}</Text>
    </View>
  );
};

export default AdminArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  justifyContent: 'center',
    //   alignItems: 'center',
  },
});
