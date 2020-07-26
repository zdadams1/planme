import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    Root: {
      path: "root",
      screens: {
        Todos: "todos",
        Budgeter: "budgeter",
        Profile: "profile",
        Meal: "meal",
        Excersize: "excersize",
      },
    },
  },
};
