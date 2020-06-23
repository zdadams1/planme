import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import TodosScreen from '../screens/TodosScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BudgeterScreen from '../screens/BudgeterScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Todos';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name='Todos'
        component={TodosScreen}
        options={{
          title: "Todo's",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-list' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Budgeter'
        component={BudgeterScreen}
        options={{
          title: 'Budgeter',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-cash' />
          ),
        }}
      />

      <BottomTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-person' />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Todos':
      return 'PlanMe';
    case 'Budgeter':
      return 'PlanMe';
    case 'Profile':
      return 'PlanMe';
  }
}
