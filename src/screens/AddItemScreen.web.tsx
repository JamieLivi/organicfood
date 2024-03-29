import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {API, graphqlOperation} from '@aws-amplify/api';
import {Storage} from '@aws-amplify/storage';
import {createVeg} from '../graphql/mutations';
import {v4 as uuidv4} from 'uuid';
import ToastContext from '../context/ToastContext';
import {RouteProp, NavigationProp} from '@react-navigation/native';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any>;
}

const initialId = () => uuidv4();

const AddItemScreen = (props: Props) => {
  const {popToast} = useContext(ToastContext);
  const [itemId, setItemId] = useState(initialId);
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [info, setInfo] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [loading, setloading] = useState(false);

  const clearInputs = () => {
    setItemId('');
    setName('');
    setSubtitle('');
    setInfo('');
  };

  const onChangeImage = async (e: any) => {
    const {assets, target} = e || {};
    let asset;
    let resUri;
    if (assets) {
      asset = assets?.[0];
      resUri = asset?.uri;
    }
    if (target) {
      asset = target?.files?.[0];

      resUri = asset ? URL.createObjectURL(asset) : null;
    }
    if (resUri) {
      setImageUri(resUri);
    }
  };

  const onPressAdd = async () => {
    setloading(true);
    try {
      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const file = `${itemId}.jpeg`;
        await Storage.put(file, blob, {
          contentType: 'image/jpeg',
          level: 'public',
        });
      }
      await API.graphql(
        graphqlOperation(createVeg, {
          input: {
            id: itemId,
            name,
            subtitle,
            info,
            image: itemId || null,
          },
        }),
      );
      popToast('success!');
      setloading(false);
      clearInputs();
      props.navigation.goBack();
    } catch (error) {
      setloading(false);
      console.log('🚀 ~ error', error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={t => {
          setName(t);
        }}
      />
      <TextInput
        label="Subtitle"
        value={subtitle}
        onChangeText={t => {
          setSubtitle(t);
        }}
      />
      <View style={styles.infotextContainer}>
        <TextInput
          label="Info"
          value={info}
          multiline
          style={styles.infotext}
          onChangeText={t => {
            setInfo(t);
          }}
        />
      </View>
      <Text style={styles.mv10}>Image</Text>
      <input
        type="file"
        style={{width: '100%', height: 100}}
        name="image"
        placeholder="select image"
        accept="image/*"
        onChange={onChangeImage}
      />
      <Button mode="contained" loading={loading} onPress={onPressAdd}>
        Add
      </Button>
    </View>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 800,
    padding: 5,
  },
  infotextContainer: {
    minHeight: 250,
  },
  infotext: {
    flex: 1,
    height: '100%',
  },
  mv10: {
    marginVertical: 10,
  },
});
