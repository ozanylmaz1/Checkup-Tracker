import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useState } from 'react';
import { styles } from './Style';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default function Signup({ navigation, name, setname }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    const db = getFirestore();

    const handleSignUp = () => {
        if (!email || !password || !name) {
            Alert.alert('Hata', 'Lütfen isim, email ve þifre giriniz.');
            return;
        }

        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                // Buraya ekle:
                await updateProfile(user, {
                    displayName: name,
                });
                setname(name);  

                setLoading(false);
                Alert.alert('Baþarýlý', 'Kayýt tamamlandý!');
                navigation.replace('Signin');
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Kayýt hatasý', error.message);
            });
    };

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
            <View style={{ flexDirection: 'row', gap: 5 }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Signin")}>
                    <Text style={styles.buttontext}>Sign In</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignUp}
                    disabled={loading}
                >
                    <Text style={styles.buttontext}>{loading ? "Loading..." : "Sign Up"}</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
