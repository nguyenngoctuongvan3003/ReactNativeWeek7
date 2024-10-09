import {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function No1({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Image style={styles.img1} source={require('./assets/img/img1.png')} />
        <Text style={styles.title}>MANAGE YOUR TASK</Text>
      </View>

      <View style={styles.container2}>
        <View style={styles.input}>
          <Fontisto name="email" size={20} color="black" />
          <TextInput placeholder=" Enter your name" />
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('No2')}>
          <Text style={styles.text}>GET STARTED → </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function No2() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getUser = async () => {
    try {
      const response = await fetch(
        'https://66fde9dd6993693089568441.mockapi.io/users'
      );
      const json = await response.json();
      setData(json[0]); // Truy cập phần tử đầu tiên của mảng
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        data && (
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              {data.username}
            </Text>
            <Text style={{ marginBottom: 20 }}>{data.avatar}</Text>
            <Text style={{ marginBottom: 20 }}>{data.tus}</Text>
            <FlatList
              data={data.toDo} 
             renderItem={({ item }) => (
                <Text>
                  {item}
                </Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )
      )}
    </View>
  );
}


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="No1"
          component={No1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="No2"
          component={No2}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 8,
  },
  img1: {
    width: 271,
    height: 271,
  },
  title: {
    color: '#8353E2',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 24,
  },
  input: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#9095A0',
    borderRadius: 12,
    paddingVertical: 6,
    width: 300,
    paddingLeft: 5,
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: '#00BDD6',
  },
  text: {
    color: 'white',
    fontWeight: 700,
    fontSize: 15,
  },
  container1: { flex: 3, justifyContent: 'center', alignItems: 'center' },

  container2: { flex: 2, justifyContent: 'space-around', alignItems: 'center' },
});
