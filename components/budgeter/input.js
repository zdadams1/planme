import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = ({
  inputValue,
  onChangeText,
  onDoneAddItem,
  placeholder,
  numeric,
  keyboardType,
}) => (
  <TextInput
    style={styles.input}
    value={inputValue}
    onChangeText={onChangeText}
    placeholder={placeholder}
    keyboardType={keyboardType}
    numeric={numeric}
    multiline={true}
    autoCapitalize='sentences'
    underlineColorAndroid='transparent'
    selectionColor={'white'}
    maxLength={30}
    returnKeyType='done'
    autoCorrect={false}
    blurOnSubmit={true}
    onSubmitEditing={onDoneAddItem}
  />
);
const styles = StyleSheet.create({
  input: {
    paddingTop: 10,
    paddingRight: 15,
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
});
export default Input;
