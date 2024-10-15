import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Stack } from 'expo-router'

import pet from '../../assets/icons/add_pet.png'
import home from '../../assets/icons/dog_house.png'
import search from '../../assets/icons/search.png'
import profile from '../../assets/icons/profile.png'


const TabIcon  = ({focused, name, icon, color}) => {

    return (
        <View>
            <Image source={icon}
            resizeMode='contain'
            tintColor={'black'}
            className="w-7 h-7"
            />
        </View>
    )
}
const TabsLayout = () => {
  return (
    <>
    <Tabs>
        <Tabs.Screen name="home" options={
            {
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
                <TabIcon
                icon={home}
                color={color}
                focused={focused}
                name={'home'}
                />
            )
            
            }
        }/>
        <Tabs.Screen name="add" options={
            {
            title: 'add',
            tabBarIcon: ({color, focused}) => (
                <TabIcon
                icon={pet}
                color={color}
                focused={focused}
                name={'add'}
                />
            ),
            headerShown: false
            }
            
        }/>
        <Tabs.Screen name="search" options={
            {
            title: 'Search',
            tabBarIcon: ({color, focused}) => (
                <TabIcon
                icon={search}
                color={color}
                focused={focused}
                name={'search'}
                />
            )
            
            }
        }/>
        <Tabs.Screen name="profile" options={
            {
            title: 'Profile',
            tabBarIcon: ({color, focused}) => (
                <TabIcon
                icon={profile}
                color={color}
                focused={focused}
                name={'profile'}
                />
           )
        }
       }/>
     

      
      

    </Tabs>
    </>
  )
}

export default TabsLayout;