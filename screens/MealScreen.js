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
import Input from "../components/profile/Input";
import List from "../components/profile/list";
import { ScrollView } from "react-native-gesture-handler";
import uuid from "uuid/v1";

export default class MealScreen extends Component {
  state = {
    age: "",
    gender: "",
    height: "",
    weight: "",
    inputValue: "",
    loadingItems: false,
    allItems: {},
    isCompleted: false,
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
    this.loadingItems();
  };

  newInputValue = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  loadingItems = async () => {
    try {
      const allItems = await AsyncStorage.getItem("Grocery");
      this.setState({
        loadingItems: true,
        allItems: JSON.parse(allItems) || {},
      });
    } catch (err) {
      console.log(err);
    }
  };
  onDoneAddItem = () => {
    const { inputValue } = this.state;
    if (inputValue !== "") {
      this.setState((prevState) => {
        const id = uuid();
        const newItemObject = {
          [id]: {
            id,
            isCompleted: false,
            text: inputValue,
            createdAt: Date.now(),
          },
        };
        const newState = {
          ...prevState,
          inputValue: "",
          allItems: {
            ...prevState.allItems,
            ...newItemObject,
          },
        };
        this.saveItems(newState.allItems);
        return { ...newState };
      });
    }
  };
  deleteItem = (id) => {
    this.setState((prevState) => {
      const allItems = prevState.allItems;
      delete allItems[id];
      const newState = {
        ...prevState,
        ...allItems,
      };
      this.saveItems(newState.allItems);
      return { ...newState };
    });
  };
  completeItem = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        allItems: {
          ...prevState.allItems,
          [id]: {
            ...prevState.allItems[id],
            isCompleted: true,
          },
        },
      };
      this.saveItems(newState.allItems);
      return { ...newState };
    });
  };
  incompleteItem = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        allItems: {
          ...prevState.allItems,
          [id]: {
            ...prevState.allItems[id],
            isCompleted: false,
          },
        },
      };
      this.saveItems(newState.allItems);
      return { ...newState };
    });
  };
  deleteAllItems = async () => {
    try {
      await AsyncStorage.removeItem("Grocery");
      this.setState({ allItems: {} });
    } catch (err) {
      console.log(err);
    }
  };
  saveItems = (newItem) => {
    const saveItem = AsyncStorage.setItem("Grocery", JSON.stringify(newItem));
  };
  render() {
    const {
      age,
      gender,
      height,
      weight,
      inputValue,
      loadingItems,
      allItems,
    } = this.state;

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

    const divcalories = calories / 6;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Meal Plan</Text>
        <View style={styles.mealcontent}>
          <Text style={styles.mealheader}>Your personalized diet</Text>
          <Text style={styles.calories}>
            Daily calory count: {calories.toPrecision(6)}
          </Text>
          <Text style={styles.divcalories}>
            To maintain the healthiest diet, it is suggested that you eat{" "}
            {divcalories.toPrecision(5)} 6 times a day evenly spaced out.
          </Text>
        </View>
        <View style={styles.groclist}>
          <Input
            placeholder="Add Grocery Item"
            inputValue={inputValue}
            onChangeText={this.newInputValue}
            onDoneAddItem={this.onDoneAddItem}
          />
          {loadingItems ? (
            <ScrollView contentContainerStyle={styles.scrollableList}>
              {Object.values(allItems)
                .reverse()
                .map((item) => (
                  <List
                    key={item.id}
                    {...item}
                    deleteItem={this.deleteItem}
                    completeItem={this.completeItem}
                    incompleteItem={this.incompleteItem}
                  />
                ))}
            </ScrollView>
          ) : (
            <ActivityIndicator size="large" color="white" />
          )}
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
    color: "orange",
    textAlign: "center",
    fontSize: 30,
  },
  mealcontent: {
    textAlign: "center",
    marginLeft: 15,
  },
  mealheader: {
    fontSize: 20,
    textAlign: "center",
    marginRight: 20,
    marginBottom: 5,
  },
  calories: {
    fontSize: 15,
    marginLeft: 60,
    marginBottom: 10,
  },
  divcalories: {
    fontSize: 15,
    marginLeft: -5,
  },
  groclist: {
    marginLeft: 25,
  },
});
