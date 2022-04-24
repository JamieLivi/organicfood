import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {API, graphqlOperation} from '@aws-amplify/api';
import {Storage} from '@aws-amplify/storage';
import {createVeggie} from '../graphql/mutations';
import {v4 as uuidv4} from 'uuid';
import ToastContext from '../context/ToastContext';
import {RouteProp, NavigationProp} from '@react-navigation/native';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any>;
}

const initialId = uuidv4();

const AddItemScreen = (props: Props) => {
  const {popToast} = useContext(ToastContext);
  const [itemId, setItemId] = useState(initialId);
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [info, setInfo] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [loading, setloading] = useState(false);

  const clearInputs = () => {
    setName('');
    setSubtitle('');
    setInfo('');
  };

  const onChangeImage = async e => {
    console.log('🚀 ~ e', e);
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
        const storageResponse: any = await Storage.put(file, blob, {
          contentType: 'image/jpeg',
          level: 'public',
        });
        console.log('🚀 ~ storageResponse', storageResponse);
      }

      const result = await API.graphql(
        graphqlOperation(createVeggie, {
          input: {
            id: itemId,
            name,
            subtitle,
            info,
            image: itemId || null,
          },
        }),
      );
      console.log('🚀 ~ result', result);
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
        //      style={inputStyle}
        onChangeText={t => {
          setName(t);
        }}
      />
      <TextInput
        label="Subtitle"
        value={subtitle}
        //      style={inputStyle}
        onChangeText={t => {
          setSubtitle(t);
        }}
      />
      <TextInput
        label="Info"
        value={info}
        multiline
        style={styles.infotext}
        //      style={inputStyle}
        onChangeText={t => {
          setInfo(t);
        }}
      />
      <input
        type="file"
        style={styles.imageinput}
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
    maxWidth: 600,
    padding: 5,
    //  justifyContent: 'space-around',
  },
  infotext: {
    minHeight: 100,
  },
  imageinput: {
    width: '100%',
    height: 100,
  },
});
