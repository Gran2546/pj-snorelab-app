import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
const storeData = async (value: string) => {
    try {
        await AsyncStorage.setItem('@storage_Key', value);
    } catch (e) {
        // saving error
        console.log(e);
    }
};

// Retrieve data
const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        // error reading value
        console.log(e);
    }
};

const removeData = async () => {
    try {
        await AsyncStorage.removeItem('@storage_Key');
    } catch (e) {
        // error reading value
        console.log(e);
    }
};

export { getData, storeData, removeData }