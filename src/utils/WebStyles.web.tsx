import React from 'react';
const WebStyles = () => {
  return (
    <React.Fragment>
      <style type="text/css">{`@font-face {
          font-family: 'MaterialCommunityIcons';
          src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');}`}</style>
    </React.Fragment>
  );
};

export default WebStyles;
