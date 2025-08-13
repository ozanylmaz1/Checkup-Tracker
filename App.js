import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useState } from 'react';
import { styles } from './Style';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Signup from './Signup';

// Firebase imports
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Firebase config
const firebaseConfig = {
    apiKey: "xxxx",
    authDomain: "xxxx",
    projectId: "xxxx",
    storageBucket: "xxxx",
    messagingSenderId: "xxxx",
    appId: "xxxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Stack = createStackNavigator();


export default function App() {
    const [name, setname] = useState("User");

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Signin">
                    {props => <Signin {...props} name={name} setname={setname} />}
                </Stack.Screen>
                <Stack.Screen name="Home" options={{ headerShown: false }}>
                    {props => <Home {...props} name={name} setname={setname} />}
                </Stack.Screen>
                <Stack.Screen name="Signup" options={{ headerShown: false }}>
                    {props => <Signup {...props} name={name} setname={setname} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function Signin({ navigation, setname }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignIn = () => {
        if (!email || !password) {
            Alert.alert("Hata", "Lütfen email ve þifre girin.");
            return;
        }

        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoading(false);
                const user = userCredential.user;
                setname(user.displayName || "User");
                navigation.replace("Home");
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert("Giriþ baþarýsýz", error.message);
            });
    };

    return (
        <SafeAreaView style={styles.logincontainer}>
            <Text style={styles.head}>Sign In</Text>
            <TextInput
                style={styles.loginput}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.loginput}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />
            <View style={{ flexDirection: "row", gap: 5, marginVertical: 10 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Signup")}
                    disabled={loading}
                >
                    <Text style={styles.buttontext}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { borderWidth: 2 }]}
                    onPress={handleSignIn}
                    disabled={loading}
                >
                    <Text style={styles.buttontext}>{loading ? "Loading..." : "Sign In"}</Text>
                </TouchableOpacity>
            </View>
            <Button
                title="Reset Password"
                color="#00e2cd"
                onPress={() => Alert.alert("Reset password logic here")}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}