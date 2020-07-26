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
    const { age, gender, height, weight } = this.state;

    let calories;

    const BMRMen = 66 + 6.23 * weight + 12.7 * height - 6.8 * age;
    const BMRWomen = 655 + 4.35 * weight + 4.7 * height - 4.7 * age;
    const menCalories = BMRMen * 1.55;
    const womenCalories = BMRWomen * 1.55;
    if (gender == "male") {
      calories = menCalories;
    } else {
      calories = womenCalories;
    }

    const days = 5;
    const minutes = calories / 45;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Excersize Plan</Text>
        <View style={styles.excersizecontent}>
          <Text style={styles.exinfo}>
            Based on your information, you should excersize{" "}
            {minutes.toPrecision(4)} minutes a day {days} days per week.
          </Text>

          <View style={styles.excersizeslist}>
            <Text style={styles.excersizesheader}>
              Here are some common excersizes to do.
            </Text>
            <Text style={styles.exc}>Pushups</Text>
            <Text style={styles.exc}>Situps</Text>
            <Text style={styles.exc}>Jumping Jacks</Text>
            <Text style={styles.exc}>Low speed Jogging</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    color: "blue",
    textAlign: "center",
    fontSize: 30,
  },
  excersizecontent: {
    textAlign: "center",
    marginLeft: 15,
  },
  exinfo: {
    fontSize: 20,
  },
  excersizeslist: {
    marginLeft: 10,
    marginTop: 8,
    fontSize: 10,
  },
  excersizesheader: {
    fontSize: 15,
  },
  exc: {
    textAlign: "center",
    marginLeft: -35,
  },
});
