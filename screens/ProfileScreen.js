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
    AsyncStorage.setItem("gender", value);
    this.setState({ gender: value });
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
          placeholder="Height"
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={this.setWeight}
          placeholder="Weight"
        />
        <Text>{this.state.age}</Text>
        <Text>{this.state.height}</Text>
        <Text>{this.state.weight}</Text>
        <Text>{this.state.gender}</Text>
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
    height: 100,
    borderWidth: 1,
    backgroundColor: "#7685ed",
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,25,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
