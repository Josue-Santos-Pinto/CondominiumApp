import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import WallItem from '../../components/WallItem'

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [wallList, setWallList] = useState([])

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Mural de Avisos'
        })
        getWall()
    },[])

    const getWall = async () => {
        setWallList([])
        setLoading(true)
        const result = await api.getWall()
        setLoading(false)
        if(result.error === ''){
            setWallList(result.list)
        } else {
            alert(result.error)
        }
    }
    
    return (
        <C.Container>
            
                {!loading && wallList.length === 0 &&
                    <C.NoListArea>
                        <C.NoListText>Não há avisos.</C.NoListText>
                    </C.NoListArea>
                }
                <C.List 
                    data={wallList}
                    onRefresh={getWall}
                    refreshing={loading}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=><WallItem data={item}/>}
                    keyExtractor={(item)=>item.id.toString()}
                />
                
           
        </C.Container>
    );
}