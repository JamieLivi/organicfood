import React from 'react';
const WebStyles = () => {
  return (
    <React.Fragment>
      <style type="text/css">{`@font-face {
          font-family: 'MaterialCommunityIcons';
          src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');}`}</style>
      <style type="text/css">{`@font-face {
          font-family: 'Montserrat-Thin';
          src: url(${require('../assets/fonts/Montserrat-Thin.ttf')}) format('truetype');}`}</style>
      <style type="text/css">{`@font-face {
          font-family: 'Montserrat-Light';
          src: url(${require('../assets/fonts/Montserrat-Light.ttf')}) format('truetype');}`}
      </style>
      <style type="text/css">
        {`@font-face {
          font-family: 'Montserrat-Medium';
          src: url(${require('../assets/fonts/Montserrat-Medium.ttf')}) format('truetype');}`}
      </style>
      <style type="text/css">
        {`@font-face {
          font-family: 'Montserrat-Regular';
          src: url(${require('../assets/fonts/Montserrat-Regular.ttf')}) format('truetype');}`}
      </style>
      <style type="text/css">
        {`@font-face {
          font-family: 'Montserrat-SemiBold';
          src: url(${require('../assets/fonts/Montserrat-SemiBold.ttf')}) format('truetype');}`}
      </style>
    </React.Fragment>
  );
};

export default WebStyles;
