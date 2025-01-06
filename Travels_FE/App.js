import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import { AppProvider } from './context/AppContext';
import ForgotPassword from './components/ForgotPassword';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#007BFF' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Login" component={LoginPage} options={{ title : 'Login' }} />
          <Stack.Screen name="Home" component={HomePage} options= {{ title : 'Home' }}/>
          <Stack.Screen name="Signup" component={SignupPage} options={{ title : 'SignUp' }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title : 'Forgot Password' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
