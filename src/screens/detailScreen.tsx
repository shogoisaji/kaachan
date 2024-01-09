import { View, Text, SafeAreaView } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { Icon, Input, Button } from '@rneui/base'
import { RootStackParamList } from '../routes/route'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProviderProps, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { tags, timeNumbers } from '../config/config'

type Props = NativeStackScreenProps<RootStackParamList, 'Detail' | 'HomeDetail'>

export const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const { saveData } = route.params
    const [timeNumber, setTimeNumber] = useState(saveData.time)
    const [selectedTag, setSelectedTag] = useState(saveData.tag)
    const [text, setText] = useState<string>(saveData.title)
    const [textIsNull, setTextIsNull] = useState<boolean>(false)

    const validateText = (text: string): boolean => {
        return text.trim().length > 0
    }
    return (
        <SafeAreaView className="flex-1 bg-custom-lightblue">
            <View className="flex-row justify-start m-4">
                <Icon
                    name="chevron-left"
                    color="#00499A"
                    size={32}
                    type="font-awesome-5"
                    onPress={() => navigation.goBack()}
                />
            </View>
            <View className="flex  m-4 p-4 bg-custom-blue rounded-2xl">
                <Text className=" text-lg font-bold text-white ml-3 mb-1 ">
                    学習内容
                </Text>
                <Input
                    value={text}
                    style={{
                        borderWidth: 1,
                        borderColor: textIsNull ? 'red' : 'lightgray',
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: 'white',
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder='例) "英語の勉強"'
                    onChangeText={(value: string) => {
                        setText(value)
                        setTextIsNull(!validateText(value))
                    }}
                    renderErrorMessage={textIsNull}
                    errorStyle={{ color: 'red' }}
                    errorMessage={
                        textIsNull ? 'テキストを入力してください' : ''
                    }
                />
                <View className="flex flex-row justify-evenly mt-10">
                    <View className="flex flex-col h-auto mb-4 items-center justify-between">
                        {tags.map((iconName, index) => (
                            <Icon
                                key={index}
                                name={iconName}
                                type="font-awesome-5"
                                color={
                                    selectedTag == iconName
                                        ? '#FF6A8C'
                                        : 'lightgray'
                                }
                                size={24}
                                onPress={() => setSelectedTag(iconName)}
                            />
                        ))}
                    </View>
                    <View className="items-center justify-center">
                        <Picker
                            style={{ height: 200, width: 150, marginTop: -30 }}
                            selectedValue={timeNumber}
                            onValueChange={(itemValue) =>
                                setTimeNumber(itemValue)
                            }
                        >
                            {timeNumbers.map((value) => (
                                <Picker.Item
                                    key={value}
                                    label={value + ' h'}
                                    value={value}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
            </View>
            <View className="flex-row justify-evenly">
                <Button
                    title="更新"
                    titleStyle={{ fontSize: 24, fontWeight: 'bold' }}
                    buttonStyle={{
                        backgroundColor: '#FF6A8C',
                        borderRadius: 16,
                    }}
                    containerStyle={{
                        width: 150,
                    }}
                    onPress={() => {
                        navigation.goBack()
                    }}
                />
            </View>
        </SafeAreaView>
    )
}
