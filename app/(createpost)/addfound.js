import { Text, View,ScrollView } from 'react-native'
import React from 'react'

import { SafeAreaView } from "react-native-safe-area-context";

export default function Addfound() {
  return (
    <SafeAreaView>
    <ScrollView>
    <View className={'flex-1 justify-center items-center'}>
      <Text>Add Found Animal</Text>

      <Text>Upload a photo</Text>

      <Text>Animal Type:</Text>
  
      <Text>Animal Color:</Text>
      <Text>Location getmylocation or type adress</Text>
      <Text>Contact Number</Text>
      <Text>hasBeenSecured? checkbox/yes/no</Text>

      <Text>Additional information: input textbox</Text>

    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

