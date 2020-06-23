import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Input from '../components/budgeter/input';
import List from '../components/budgeter/list';
import Button from '../components/Button';
import { MonoText } from '../components/StyledText';
import uuid from 'uuid/v1';

export default class BudgeterScreen extends React.Component {
  state = {
    inputValueNameIncome: '',
    inputValueNumberIncome: '',
    inputValueNameExpense: '',
    inputValueNumberExpense: '',
    loadingItemsIncome: false,
    loadingItemsExpense: false,
    allItemsIncome: [],
    allItemsExpense: [],
    isCompleted: false,
  };
  componentDidMount = () => {
    this.loadingItemsIncome();
    this.loadingItemsExpense();
  };
  newInputValueNameIncome = (value) => {
    this.setState({
      inputValueNameIncome: value,
    });
  };
  newInputValueNumberIncome = (value) => {
    this.setState({
      inputValueNumberIncome: value,
    });
  };
  newInputValueNameExpense = (value) => {
    this.setState({
      inputValueNameExpense: value,
    });
  };
  newInputValueNumberExpense = (value) => {
    this.setState({
      inputValueNumberExpense: value,
    });
  };
  loadingItemsIncome = async () => {
    try {
      const allItemsIncome = await AsyncStorage.getItem('income');
      this.setState({
        loadingItemsIncome: true,
        allItemsIncome: JSON.parse(allItemsIncome) || [],
      });
    } catch (err) {
      console.log(err);
    }
  };
  loadingItemsExpense = async () => {
    try {
      const allItemsExpense = await AsyncStorage.getItem('expense');
      this.setState({
        loadingItemsExpense: true,
        allItemsExpense: JSON.parse(allItemsExpense) || [],
      });
    } catch (err) {
      console.log(err);
    }
  };
  onDoneAddItemIncome = () => {
    const { inputValueNameIncome, inputValueNumberIncome } = this.state;
    if (inputValueNameIncome !== '' && inputValueNumberIncome !== '') {
      this.setState((prevState) => {
        const id = uuid();
        const newItemObject = {
          [id]: {
            id,
            isCompleted: false,
            text: inputValueNameIncome,
            number: inputValueNumberIncome,
            createdAt: Date.now(),
          },
        };
        const newState = {
          ...prevState,
          inputValueNameIncome: '',
          inputValueNumberIncome: '',
          allItemsIncome: {
            ...prevState.allItemsIncome,
            ...newItemObject,
          },
        };
        this.saveItemsIncome(newState.allItemsIncome);
        return { ...newState };
      });
    }
  };
  onDoneAddItemExpense = () => {
    const { inputValueNameExpense, inputValueNumberExpense } = this.state;
    if (inputValueNameExpense !== '' && inputValueNumberExpense !== '') {
      this.setState((prevState) => {
        const id = uuid();
        const newItemObject = {
          [id]: {
            id,
            isCompleted: false,
            text: inputValueNameExpense,
            number: inputValueNumberExpense,
            createdAt: Date.now(),
          },
        };
        const newState = {
          ...prevState,
          inputValueNameExpense: '',
          inputValueNumberExpense: '',
          allItemsExpense: {
            ...prevState.allItemsExpense,
            ...newItemObject,
          },
        };
        this.saveItemsExpense(newState.allItemsExpense);
        return { ...newState };
      });
    }
  };
  deleteItemIncome = (id) => {
    this.setState((prevState) => {
      const allItemsIncome = prevState.allItemsIncome;
      delete allItemsIncome[id];
      const newState = {
        ...prevState,
        ...allItemsIncome,
      };
      this.saveItemsIncome(newState.allItemsIncome);
      return { ...newState };
    });
  };
  deleteItemExpense = (id) => {
    this.setState((prevState) => {
      const allItemsExpense = prevState.allItemsExpense;
      delete allItemsExpense[id];
      const newState = {
        ...prevState,
        ...allItemsExpense,
      };
      this.saveItemsExpense(newState.allItemsExpense);
      return { ...newState };
    });
  };
  completeItemIncome = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        allItemsIncome: {
          ...prevState.allItemsIncome,
          [id]: {
            ...prevState.allItemsIncome[id],
            isCompleted: true,
          },
        },
      };
      this.saveItemsIncome(newState.allItemsIncome);
      return { ...newState };
    });
  };
  completeItemExpense = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        allItemsExpense: {
          ...prevState.allItemsExpense,
          [id]: {
            ...prevState.allItemsExpense[id],
            isCompleted: true,
          },
        },
      };
      this.saveItemsExpense(newState.allItemsExpense);
      return { ...newState };
    });
  };
  incompleteItemIncome = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        allItemsIncome: {
          ...prevState.allItemsIncome,
          [id]: {
            ...prevState.allItemsIncome[id],
            isCompleted: false,
          },
        },
      };
      this.saveItemsIncome(newState.allItemsIncome);
      return { ...newState };
    });
  };
  incompleteItemExpense = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        allItemsExpense: {
          ...prevState.allItemsExpense,
          [id]: {
            ...prevState.allItemsExpense[id],
            isCompleted: false,
          },
        },
      };
      this.saveItemsExpense(newState.allItemsExpense);
      return { ...newState };
    });
  };
  deleteAllItemsIncome = async () => {
    try {
      await AsyncStorage.removeItem('income');
      this.setState({ allItemsIncome: {} });
    } catch (err) {
      console.log(err);
    }
  };
  deleteAllItemsExpense = async () => {
    try {
      await AsyncStorage.removeItem('expense');
      this.setState({ allItemsExpense: {} });
    } catch (err) {
      console.log(err);
    }
  };
  saveItemsIncome = (newItem) => {
    const saveItem = AsyncStorage.setItem('income', JSON.stringify(newItem));
  };
  saveItemsExpense = (newItem) => {
    const saveItem = AsyncStorage.setItem('expense', JSON.stringify(newItem));
  };
  render() {
    const {
      inputValueNameIncome,
      inputValueNumberIncome,
      inputValueNameExpense,
      inputValueNumberExpense,
      loadingItemsIncome,
      loadingItemsExpense,
      allItemsIncome,
      allItemsExpense,
    } = this.state;

    const incomeData = Object.values(allItemsIncome);
    const incomeSum = incomeData.reduce(function (tot, arr) {
      const toNum = parseInt(arr.number);
      return tot + toNum;
    }, 0);

    const expenseData = Object.values(allItemsExpense);
    const expenseSum = expenseData.reduce(function (tot, arr) {
      const toNum = parseInt(arr.number);
      return tot + toNum;
    }, 0);

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Budgeter</Text>
        <View style={styles.income}>
          <Text style={styles.incometitle}>Monthly Income</Text>
          <Input
            inputValue={inputValueNameIncome}
            placeholder='Name'
            onChangeText={this.newInputValueNameIncome}
            onDoneAddItem={this.onDoneAddItemIncome}
          />
          <Input
            inputValue={inputValueNumberIncome}
            placeholder='Amount'
            onChangeText={this.newInputValueNumberIncome}
            onDoneAddItem={this.onDoneAddItemIncome}
          />
        </View>
        <View style={styles.incomeList}>
          <View style={styles.column}>
            {/* <View style={styles.deleteAllButton}>
              <Input deleteAllItems={this.deleteAllItems} />
            </View> */}
          </View>
          {loadingItemsIncome ? (
            <ScrollView contentContainerStyle={styles.scrollableList}>
              {Object.values(allItemsIncome)
                .reverse()
                .map((item) => (
                  <List
                    key={item.id}
                    {...item}
                    deleteItem={this.deleteItemIncome}
                    completeItem={this.completeItemIncome}
                    incompleteItem={this.incompleteItemIncome}
                  />
                ))}
            </ScrollView>
          ) : (
            <ActivityIndicator size='large' color='white' />
          )}
          <Text style={styles.incomesum}>Total Monthly Income {incomeSum}</Text>
        </View>
        <View style={styles.expenses}>
          <Text style={styles.expensetitle}>Monthly Expenses</Text>
          <Input
            inputValue={inputValueNameExpense}
            placeholder='Name'
            onChangeText={this.newInputValueNameExpense}
            onDoneAddItem={this.onDoneAddItemExpense}
          />
          <Input
            inputValue={inputValueNumberExpense}
            placeholder='Amount'
            onChangeText={this.newInputValueNumberExpense}
            onDoneAddItem={this.onDoneAddItemExpense}
          />
        </View>
        <View style={styles.incomeList}>
          <View style={styles.column}>
            {/* <View style={styles.deleteAllButton}>
              <Input deleteAllItems={this.deleteAllItems} />
            </View> */}
          </View>
          {loadingItemsExpense ? (
            <ScrollView contentContainerStyle={styles.scrollableList}>
              {Object.values(allItemsExpense)
                .reverse()
                .map((item) => (
                  <List
                    key={item.id}
                    {...item}
                    deleteItem={this.deleteItemExpense}
                    completeItem={this.completeItemExpense}
                    incompleteItem={this.incompleteItemExpense}
                  />
                ))}
            </ScrollView>
          ) : (
            <ActivityIndicator size='large' color='white' />
          )}
        </View>
        <Text style={styles.expensesum}>
          Total Monthly Expenses {expenseSum}
        </Text>
        <View style={styles.stats}>
          <Text style={styles.statstitle}>Statistics</Text>
          <Text style={styles.leftover}>
            Leftover income {incomeSum - expenseSum}
          </Text>
          <Text style={styles.incdebt}>
            Income to debt ratio{' '}
            {((expenseSum / incomeSum) * 100).toPrecision(4)} %
          </Text>
        </View>
      </ScrollView>
    );
  }
}
BudgeterScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 10,
    color: 'green',
  },
  incometitle: {
    color: 'green',
    fontSize: 20,
  },
  expensetitle: {
    color: 'red',
    fontSize: 20,
  },
  incomesum: {
    color: 'green',
    fontSize: 20,
  },
  expensesum: {
    color: 'red',
    fontSize: 20,
  },
  statstitle: {
    color: 'blue',
    fontSize: 20,
  },
  leftover: {
    color: 'green',
  },
});
