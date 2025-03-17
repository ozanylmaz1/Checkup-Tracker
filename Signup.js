import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { styles } from './Style';

export default function Signup() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [name, setname] = useState("User")

    return (
        <SafeAreaView style={styles.signup}>
            <Text style={styles.head}>Sign Up</Text>
            <TextInput
                style={styles.loginput}
                name="name"
                placeholder="Name"
                onChangeText={text => setname(text)}
            />
            <TextInput
                style={styles.loginput}
                name="email"
                placeholder="Email"
                onChangeText={text => setemail(text)}
            />
            <TextInput
                style={styles.loginput}
                name="password"
                placeholder="Password"
                onChangeText={text => setpassword(text)}
            />
            <View style={{ flexDirection: 'row', gap: 5 }}>
                <TouchableOpacity style={styles.button} onPressOut={() => alert()}>
                    <Text style={styles.buttontext}>Sign In</Text>
                </TouchableOpacity>


                <TouchableOpacity style={[styles.button, { borderWidth: 2 }]} onPressOut={() => alert()}>
                    <Text style={styles.buttontext}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
