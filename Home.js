import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Image, SafeAreaView, TouchableOpacity, Modal, Switch, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import { styles } from './Style';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import medicine from './assets/medicine.png';
import reports from './assets/reports.png';
import analysis from './assets/analysis.png';
import disease from './assets/disease.png';
import radiology from './assets/ct-scan.png';
import pathology from './assets/pathology.png';

export default function Home() {
    const [aktif, setaktif] = useState(true)
    const [profil, setprofil] = useState(false)
    const [age, setage] = useState(20)
    const [weight, setweight] = useState(50)
    const [height, setheight] = useState(170)
    const [name, setname] = useState("User")
    const blood = ['ARH+', 'ARH-', 'BRH+', 'BRH-', 'ABRH+', 'ABRH-', '0RH+', '0RH-']
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState("RH")
    const data = [
        { id: "1", title: "Medicines", ButtonImage: medicine },
        { id: "2", title: "Reports and Prescriptions", ButtonImage: reports },
        { id: "3", title: "My Tests and X-rays", ButtonImage: analysis },
        { id: "4", title: "Diseases", ButtonImage: disease },
        { id: "5", title: "Radiology", ButtonImage: radiology },
        { id: "6", title: "Pathology", ButtonImage: pathology },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.nav, { backgroundColor: aktif ? '#00e2cd' : 'red' }]}>
                <View style={{ flexDirection: 'row', }}>
                    <Image source={require("./assets/pp.png")} style={styles.profil} />
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.info}>Age: {age}</Text>
                        <View style={{ flexDirection: 'row', gap: 5, marginTop: 10, }}>
                            <Ionicons name='scale' size={24} color='white' />
                            <Text style={styles.info}>{weight}kg</Text>
                            <FontAwesome5 name='ruler-vertical' size={24} color='white' />
                            <Text style={styles.info}>{height}cm</Text>
                            <Fontisto name='blood-drop' size={24} color='white' />
                            <Text style={styles.info}>{search}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ marginRight: 10, marginTop: 10, }} onPress={() => setprofil((prev) => !prev)} >
                    <AntDesign name="setting" size={40} color="white" />
                </TouchableOpacity>
            </View>

            <Modal visible={profil} animationType='slide' transparent={true}>
                <View style={styles.modalview}>
                    <View style={[styles.modalmenu, { backgroundColor: aktif ? '#00e2cd' : 'red' }]}>
                        <Text style={styles.valuename}>blood group</Text>
                        <TextInput
                            style={[{ textAlign: 'center' }, styles.value]}
                            placeholder="BRH+"
                            value={search}
                            onFocus={() => setIsOpen(true)}
                            onChangeText={(text) => setSearch(text)}
                        />

                        {isOpen && (
                            <FlatList
                                data={blood.filter((p) => p.toString().includes(search))}
                                keyExtractor={(item) => item.toString()}
                                style={styles.dropdown}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.sec} onPress={() => { setSearch(item.toString()); setIsOpen(false); }}>
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                        <Text style={styles.valuename}>Age</Text>
                        <View style={styles.value}>
                            <Button title='-' color='#000' onPress={() => setage((prev) => prev - 1)}></Button>
                            <Text>{age}</Text>
                            <Button title='+' color='#000' onPress={() => setage((prev) => prev + 1)}></Button>
                        </View>
                        <Text style={styles.valuename}>Weight</Text>
                        <View style={styles.value}>
                            <Button title='-' color='#000' onPress={() => setweight((prev) => prev - 1)}></Button>
                            <Text>{weight}</Text>
                            <Button title='+' color='#000' onPress={() => setweight((prev) => prev + 1)}></Button>
                        </View>
                        <Text style={styles.valuename}>Height</Text>
                        <View style={styles.value}>
                            <Button title='-' color='#000' onPress={() => setheight((prev) => prev - 1)}></Button>
                            <Text>{height}</Text>
                            <Button title='+' color='#000' onPress={() => setheight((prev) => prev + 1)}></Button>
                        </View>
                        <View style={{ backgroundColor: 'white', borderRadius: 4, }}>
                            <Button title='save' color='#000' onPress={() => setprofil((prev) => !prev)}></Button>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.hr}>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ fontSize: 18, fontWeight: '300', marginLeft: 10, }}>Active Appointment:  </Text>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: aktif ? '#00bcaa' : 'red' }}>
                        {aktif ? 'Yes' : 'No'}
                    </Text>
                </View>
                <View style={{ marginRight: 10, flexDirection: 'row' }}>
                    <Switch
                        value={aktif}
                        onValueChange={() => setaktif((prev) => !prev)}
                        thumbColor='white'
                        trackColor={{ true: '#00e2cd', false: '#999' }}
                    />
                </View>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.main}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ alignItems: 'center', }} onPress={() => {
                        alert('This service is currently unavailable but will be available soon.');
                    }}>
                        <Image source={item.ButtonImage} style={styles.menu} />
                        <Text style={styles.buttonText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}