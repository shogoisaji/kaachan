import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../screens/homeScreen'
import { DetailScreen } from '../screens/detailScreen'
import { HistoryScreen } from '../screens/historyScreen'
import { SettingScreen } from '../screens/settingScreen'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'

export type RootStackParamList = {
    HomeScreen: undefined
    HomeStack: undefined
    Detail: { saveData: SaveDataTypes }
    HomeDetail: { saveData: SaveDataTypes }
    HistoryScreen: undefined
    HistoryStack: undefined
    Setting: undefined
    DataList: undefined
}

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootStackParamList>()

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
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
                name="HistoryScreen"
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
                initialRouteName="HomeScreen"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName
                        let iconSize

                        if (route.name === 'HomeStack') {
                            iconName = 'home'
                            iconSize = focused ? 38 : 32
                        } else if (route.name === 'HistoryStack') {
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
                    tabBarStyle: {
                        height: 70,
                        backgroundColor: '#00499A',
                        paddingTop: 8,
                        paddingBottom: 20,
                    },
                })}
            >
                <Tab.Screen
                    name="HomeStack"
                    component={HomeStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="HistoryStack"
                    component={HistoryStack}
                    options={{ headerShown: false }}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            e.preventDefault()
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'HistoryStack' }],
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
