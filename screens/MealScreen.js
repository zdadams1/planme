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
      const allItems = await AsyncStorage.getItem("ToDos");
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
      await AsyncStorage.removeItem("ToDos");
      this.setState({ allItems: {} });
    } catch (err) {
      console.log(err);
    }
  };
  saveItems = (newItem) => {
    const saveItem = AsyncStorage.setItem("ToDos", JSON.stringify(newItem));
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

    // 18 and younger
    if (age <= 18 && gender == "male" && height <= 72 && weight <= 170) {
    }

    if (age <= 18 && gender == "female" && height <= 72 && weight <= 170) {
    }

    if (age <= 18 && gender == "male" && height > 72 && weight > 170) {
    }

    if (age <= 18 && gender == "female" && height > 72 && weight > 170) {
    }

    // 19 and 36
    if (
      age > 18 &&
      age <= 36 &&
      gender == "female" &&
      height <= 72 &&
      weight <= 170
    ) {
    }

    if (
      age > 18 &&
      age <= 36 &&
      gender == "male" &&
      height <= 72 &&
      weight <= 170
    ) {
    }

    if (
      age > 18 &&
      age <= 36 &&
      gender == "female" &&
      height > 72 &&
      weight > 170
    ) {
    }

    if (
      age > 18 &&
      age <= 36 &&
      gender == "male" &&
      height > 72 &&
      weight > 170
    ) {
    }

    // 37 and 55
    if (
      age > 36 &&
      age <= 55 &&
      gender == "female" &&
      height <= 72 &&
      weight <= 170
    ) {
    }

    if (
      age > 36 &&
      age <= 55 &&
      gender == "male" &&
      height <= 72 &&
      weight <= 170
    ) {
    }

    if (
      age > 36 &&
      age <= 55 &&
      gender == "female" &&
      height > 72 &&
      weight > 170
    ) {
    }

    if (
      age > 36 &&
      age <= 55 &&
      gender == "male" &&
      height > 72 &&
      weight > 170
    ) {
    }

    // 56 and 70
    if (
      age > 55 &&
      age <= 70 &&
      gender == "female" &&
      height <= 72 &&
      weight <= 170
    ) {
    }

    if (
      age > 55 &&
      age <= 70 &&
      gender == "male" &&
      height <= 72 &&
      weight <= 170
    ) {
    }

    if (
      age > 55 &&
      age <= 70 &&
      gender == "female" &&
      height > 72 &&
      weight > 170
    ) {
    }

    if (
      age > 55 &&
      age <= 70 &&
      gender == "male" &&
      height > 72 &&
      weight > 170
    ) {
    }

    // 70 and 90
    if (age > 70 && gender == "female" && height <= 72 && weight <= 170) {
    }

    if (age > 70 && gender == "male" && height <= 72 && weight <= 170) {
    }

    if (age > 70 && gender == "female" && height > 72 && weight > 170) {
    }

    if (age > 70 && gender == "male" && height > 72 && weight > 170) {
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Meal Plan</Text>
        <View style={styles.mealcontent}>
          <Text style={styles.mealheader}>Your personalized diet</Text>
          <Text style={styles.calories}>Daily calory count: {calories}</Text>
          <Text style={styles.divcalories}>
            To maintain the healthiest diet, it is suggested that you eat{" "}
            {divcalories} 6 times a day evenly spaced out.
          </Text>
        </View>
        <View style={styles.groclist}>
          <TextInput
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
});
