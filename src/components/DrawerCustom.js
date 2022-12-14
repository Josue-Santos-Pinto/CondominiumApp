import React from "react";
import styled from "styled-components/native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useStateValue} from '../contexts/StateContext'
import api from '../services/api'

import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from "react-native";


const DrawerArea = styled.View`
    flex: 1;
    background-color: #FFF;
`
const DrawerLogoArea = styled.View`
    padding: 10px 20px;
    border-bottom-width: 1px;
    border-bottom-color: #EEE;
`
const DrawerLogo = styled.Image`
    width: 190px;
    height: 40px;
`
const DrawerScroller = styled.ScrollView`
    flex: 1;
    margin: 20px 0;
`
const ChangeUnitArea = styled.View`
    margin: 10px;
`
const ChangeUnitButton = styled.TouchableOpacity`
    background-color: #8863E6;
    padding: 12px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`
const ChangeUnitButtonText = styled.Text`
    color: #FFF;
    font-size: 15px;
    font-weight: bold;
`
const FooterArea = styled.View`
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const FooterInfo = styled.View``
const FooterProfile = styled.Text`
    font-size: 15px;
    color: #000;
`
const FooterUnitText = styled.Text`
    font-size: 15px;
    color: #666E78;
`
const FooterUnitButton = styled.TouchableOpacity``
const MenuButton = styled.TouchableOpacity`
    flex-direction: row;
    margin-bottom: 5px;
    border-radius: 5px;
    align-items: center;
`
const MenuSquare = styled.View`
    width: 5px;
    height: 35px;
    background-color: transparent;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`
const MenuButtonText = styled.Text`
    font-size: 15px;
    margin-left: 10px;
    color: #666E78;
`



export default (props) => {

    const navigation = useNavigation()
    const [context, dispatch] = useStateValue()

    const menus = [
        {title: 'Mural de Avisos', icon:'inbox', screen:'WallScreen'},
        {title: 'Documentos', icon:'file-text', screen:'DocumentScreen'},
        {title: 'Reservas', icon:'calendar', screen:'ReservationScreen'},
        {title: 'Livro de Ocorr??ncias', icon:'bug', screen:'WarningScreen'},
        {title: 'Achados e Perdidos', icon:'search', screen:'FoundAndLostScreen'},
        {title: 'Boletos', icon:'wpforms', screen:'BilletScreen'},
        {title: 'Perfil', icon:'user', screen:'ProfileScreen'}
    ]

    const handleChangeUnit = async () => {
        await AsyncStorage.removeItem('property')
        navigation.reset({
            index: 1,
            routes: [{name: 'ChoosePropertyScreen'}]
        })
    }

    const handleLogoutButton = async () => {
        await api.logout()
        navigation.reset({
            index: 1,
            routes:[{name:'LoginScreen'}]
        })
    }

    return (
        <DrawerArea>
            <StatusBar backgroundColor='#333'/>
            <DrawerLogoArea>
                <DrawerLogo 
                source={require('../assets/homelogo.png')} 
                resizeMode= 'contain'
                />
            </DrawerLogoArea>
            <DrawerScroller>
                {menus.map((item,index)=>(
                    <MenuButton key={index} onPress={()=>navigation.navigate(item.screen)}>
                        <MenuSquare></MenuSquare>
                        <FontAwesome name={item.icon} size={20} color={'#666E78'} />
                        <MenuButtonText>{item.title}</MenuButtonText>
                    </MenuButton>
                ))}
                <MenuButton onPress={handleLogoutButton}>
                        <MenuSquare></MenuSquare>
                        <FontAwesome name='toggle-left' size={20} color={'#666E78'} />
                        <MenuButtonText>Sair</MenuButtonText>
                </MenuButton>
            </DrawerScroller>
            <ChangeUnitArea>
                <ChangeUnitButton onPress={handleChangeUnit}>
                    <ChangeUnitButtonText>Trocar Unidade</ChangeUnitButtonText>
                </ChangeUnitButton>
            </ChangeUnitArea>
            <FooterArea>
                <FooterInfo>
                    <FooterProfile> Ol?? {context.user.user.name} </FooterProfile>
                    <FooterUnitText>{context.user.property.name}</FooterUnitText>
                </FooterInfo>
                <FooterUnitButton onPress={()=>navigation.navigate('UnitScreen')}>
                    <FontAwesome name='gear' size={24} color='#666E78' />
                </FooterUnitButton>
            </FooterArea>
        </DrawerArea>
    )
}