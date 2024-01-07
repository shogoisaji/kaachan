import { Text } from 'react-native'
import { HomePage } from '../pages/homePage'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { HistoryPage } from '../pages/historyPage'

const Tab = createMaterialBottomTabNavigator()

const SettingPage = () => <Text>お気に入り</Text>

export const BottomNav = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Main"
                activeColor="#00499A"
                inactiveColor="#F5F2E7"
                barStyle={{ backgroundColor: '#00499A' }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({ color }) => (
                            <Icon name="home" color={color} size={28} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="History"
                    component={HistoryPage}
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({ color }) => (
                            <Icon name="list" color={color} size={28} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Setting"
                    component={SettingPage}
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({ color }) => (
                            <Icon name="gear" color={color} size={28} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
