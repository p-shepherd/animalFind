import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const AddScreen = () => {
  const router = useRouter();  // Get the router object

  return (
    <View className={'flex-1 justify-center items-center'}>
      <View className={'flex-row justify-between w-full px-5'}>
        {/* Navigate programmatically using router.push */}
        <TouchableOpacity 
          className={'h-[90%] w-[50%] bg-blue-500 justify-center items-center rounded-lg'}
          onPress={() => router.push('(createpost)/addfound')}  // Programmatic navigation
        >
          <Text className={'text-white text-lg'}>Add Found Animal</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className={'h-[90%] w-[50%] bg-green-500 justify-center items-center rounded-lg'}
          onPress={() => router.push('(createpost)/addlost')}  // Programmatic navigation
        >
          <Text className={'text-white text-lg'}>Add Lost Animal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AddScreen;
