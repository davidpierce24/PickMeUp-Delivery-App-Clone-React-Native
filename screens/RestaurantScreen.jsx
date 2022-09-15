import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {
        params: {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        }
    } = useRoute();

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        }));
    }, [dispatch])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <>
        <BasketIcon />


        <ScrollView>
            <View className="relative">
                <Image 
                    source={{
                        uri: urlFor(imgUrl).url(),
                    }}
                    className="w-full h-56 bg-gray-300 p-4"
                />
                <TouchableOpacity 
                    onPress={navigation.goBack} 
                    className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
                >
                    <Feather name="arrow-left" size={20} color="#00CCBB"/>
                </TouchableOpacity>
            </View>

            <View className="bg-white">
                <View className="px-4 pt-4">
                    <Text className="text-3xl font-bold">{title}</Text>
                    <View className="flex-row space-x-2 my-1">
                        <View className="flex-row items-center space-x-1">
                            <FontAwesome name="star" size={22} color="#00CCBB"/>
                            <Text className="text-sm text-gray-500">
                                <Text className="text-teal-500">{rating}</Text> · {genre}
                            </Text>
                        </View>

                        <View className="flex-row items-center space-x-1">
                            <IonIcon name="location-sharp" size={22} color="gray"/>
                            <Text className="text-sm text-gray-500">Nearby · {address}</Text>
                        </View>
                    </View>

                    <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
                </View>
            </View>
            
            <View className="pb-36">
                <Text className="px-4 pt-6 mb-3 font-bold text-xl">
                    Menu
                </Text>

                {/* Dish Rows */}
                {dishes.map((dish) => (
                    <DishRow 
                        key={dish._id}
                        id={dish._id}
                        name={dish.name}
                        description={dish.short_description}
                        price={dish.price}
                        image={dish.image}
                    />
                ))}
            </View>

        </ScrollView>
        </>
    )
}

export default RestaurantScreen