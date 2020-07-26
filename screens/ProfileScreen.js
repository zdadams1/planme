import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Input from "../components/profile/Input";
import List from "../components/profile/list";
import { MonoText } from "../components/StyledText";
import uuid from "uuid/v1";

export default class ProfileScreen extends React.Component {
  state = {
    age: "",
    gender: "",
    height: "",
    weight: "",
  };
  componentDidMount = () => {
    AsyncStorage.getItem("age").then((value) => this.setState({ age: value }));
    AsyncStorage.getItem("gender").then((value) =>
      this.setState({ gender: value })
    );
    AsyncStorage.getItem("height").then((value) =>
      this.setState({ height: value })
    );
    AsyncStorage.getItem("weight").then((value) =>
      this.setState({ weight: value })
    );
  };
  setAge = (value) => {
    AsyncStorage.setItem("age", value);
    this.setState({ age: value });
  };
  setGender = (value) => {
    const lowerValue = value.toLowerCase();
    AsyncStorage.setItem("gender", lowerValue);
    this.setState({ gender: lowerValue });
  };
  setHeight = (value) => {
    AsyncStorage.setItem("height", value);
    this.setState({ height: value });
  };
  setWeight = (value) => {
    AsyncStorage.setItem("weight", value);
    this.setState({ weight: value });
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={this.setAge}
          placeholder="Age"
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={this.setGender}
          placeholder="Gender"
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={this.setHeight}
          placeholder="Height(inches)"
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={this.setWeight}
          placeholder="Weight(pounds)"
        />
        <Text style={styles.items}>Age: {this.state.age}</Text>
        <Text style={styles.items}>Height: {this.state.height}</Text>
        <Text style={styles.items}>Weight: {this.state.weight}</Text>
        <Text style={styles.items}>Gender: {this.state.gender}</Text>
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textInput: {
    margin: 5,
    height: 75,
  },
  items: {
    textAlign: "center",
    marginTop: 10,
  },
});
