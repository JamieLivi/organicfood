import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Auth} from '@aws-amplify/auth';
import AuthContext from '../context/AuthContext';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);
  const {setSignedIn} = useContext(AuthContext);

  const onPressSignIn = async () => {
    setloading(true);
    try {
      const result = await Auth.signIn(email, password);
      console.log(result);
      setSignedIn(true);
    } catch (e: any) {
      setloading(false);
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={t => {
          setEmail(t);
        }}
      />

      <TextInput
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={p => {
          setPassword(p);
        }}
      />
      <Button loading={loading} onPress={onPressSignIn}>
        Sign In
      </Button>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 500,
  },
});
