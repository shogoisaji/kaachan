// import { View } from 'react-native'
// import { Icon, Button, Input } from '@rneui/themed'
// import {
//     NativeStackNavigationProp,
//     NativeStackScreenProps,
// } from '@react-navigation/native-stack'
// import { useNavigation } from '@react-navigation/native'
// import { RootRoutesParamList } from '../routes/route'

// // type Props<T extends keyof RootRoutesParamList> = NativeStackScreenProps<
// //     RootRoutesParamList,
// //     T
// // >

// export const BottomNav: React.FC = () => {
//     const navigation =
//         useNavigation<NativeStackNavigationProp<RootRoutesParamList>>()
//     return (
//         <View className="flex-row justify-evenly bg-custom-darkblue h-20 p-4">
//             <Icon
//                 name="home"
//                 color="white"
//                 size={32}
//                 type="font-awesome-5"
//                 onPress={() => navigation.navigate('Home')}
//             />
//             <Icon
//                 name="list"
//                 color="white"
//                 size={32}
//                 type="font-awesome-5"
//                 onPress={() => navigation.navigate('History')}
//             />
//             <Icon
//                 name="gear"
//                 color="white"
//                 size={32}
//                 type="font-awesome"
//                 onPress={() => navigation.navigate('Setting')}
//             />
//         </View>
//     )
// }
