import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

const RandomNumber = props => {
  const handlePress = e => {
    if (props.isDisabled) {
      return;
    }
    props.onPress(props.id);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.randomNum, props.isDisabled && styles.disabled]}>
        {props.num}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  randomNum: {
    backgroundColor: '#DB7093',
    width: 100,
    marginHorizontal: 30,
    marginVertical: 25,
    fontSize: 50,
    color: 'whitesmoke',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default RandomNumber;
