import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { styles } from './Style';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Signup from './Signup';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Signin" component={Signin} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Signup" component={Signup} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
function Signin({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <SafeAreaView style={styles.logincontainer}>
            <Text style={styles.head}>Sign In</Text>
            <TextInput
                style={styles.loginput}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.loginput}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => setPassword(text)}
            />
            <View style={{ flexDirection: 'row', gap: 5 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.buttontext}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { borderWidth: 2 }]}
                    onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.buttontext}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <Button title='Reset Password' color='#00e2cd' onPress={() => alert('Reset password logic here')} />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
