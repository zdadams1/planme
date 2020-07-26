import React, { Component } from "react";
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

export default class ExcersizeScreen extends Component {
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
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Excersize Plan</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
