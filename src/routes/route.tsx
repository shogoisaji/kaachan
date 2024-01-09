import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../screens/homeScreen'
import { DetailScreen } from '../screens/detailScreen'
import { HistoryScreen } from '../screens/historyScreen'
import { SettingScreen } from '../screens/settingScreen'
import { DataList } from '../components/dataList'
import { NavigationContainer } from '@react-navigation/native'
import { Icon } from '@rneui/themed'
import { FontAwesome } from '@expo/vector-icons'

export type RootStackParamList = {
    Home: undefined
    Detail: { saveData: SaveDataTypes }
    HomeDetail: { saveData: SaveDataTypes }
    History: undefined
    Setting: undefined
    DataList: undefined
}

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootStackParamList>()

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="HomeDetail"
                component={DetailScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
const HistoryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="History"
                component={HistoryScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export const RootRoutes = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName
                        let iconSize

                        if (route.name === 'Home') {
                            iconName = 'home'
                            iconSize = focused ? 38 : 32
                        } else if (route.name === 'History') {
                            iconName = 'list'
                            iconSize = focused ? 36 : 30
                        } else if (route.name === 'Setting') {
                            iconName = 'gear'
                            iconSize = focused ? 38 : 32
                        }

                        return (
                            <FontAwesome
                                name={iconName as any}
                                size={iconSize}
                                color={color}
                            />
                        )
                    },
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FF6A8C',
                    tabBarInactiveTintColor: 'white',
                    tabBarStyle: { backgroundColor: '#00499A', paddingTop: 10 },
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="History"
                    component={HistoryStack}
                    options={{ headerShown: false }}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            e.preventDefault()
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'History' }],
                            })
                        },
                    })}
                />
                <Tab.Screen
                    name="Setting"
                    component={SettingScreen}
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
