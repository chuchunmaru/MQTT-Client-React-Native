import React from 'react'
import { ScrollView, View, Image, Text } from 'react-native'

export default class Menu extends React.Component {


    render() {
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <ScrollView style={{ width: '99%', height: '100%', paddingVertical: 20 }}>
                    <Text style={{ padding: 20, textAlign: 'center', fontSize: 20 }}>
                        Desenvolvedor 1: chuchunmaru
                    </Text>
                    <Image source={require('../../assets/icons/gi.png')} style={{ width: '90%', height: 400, marginLeft: 'auto', marginRight: 'auto' }} />
                    <Text style={{ padding: 20, }}>
                        amante das artes plasticas, gosta de viajar, educado, convive bem em sociedade, facilidade com javascript
                    </Text>
                    <View style={{ height: 50, width: '90%' }} />
                    <Text style={{ padding: 20, textAlign: 'center', fontSize: 20 }}>
                        Desenvolvedor 2: caique
                    </Text>
                    <Image source={require('../../assets/icons/cq.png')} style={{ width: '90%', height: 400, marginLeft: 'auto', marginRight: 'auto' }} />
                    <Text style={{ padding: 20, }}>
                        primata
                    </Text>
                    <View style={{ height: 50, width: '90%' }} />
                    <Text style={{ padding: 20, textAlign: 'center', fontSize: 20 }}>
                        Ratatouile ao molho de churume
                    </Text>
                    <Image source={require('../../assets/icons/ra.png')} style={{ width: '90%', height: 300, marginLeft: 'auto', marginRight: 'auto' }} />
                    <Text style={{ padding: 20, }}>
                        Miudos de esgoto a moda da casa com molho de churume e direito a tres porções de baratas ao rum, acompanha 1 cerveja de procedencia duvidosa e alimenta 3 pessoas, mas se estiverem com muita fome talves de pra 5 pessoas
                    </Text>
                    <View style={{ height: 50, width: '90%' }} />
                    <Text style={{ padding: 20, textAlign: 'center', fontSize: 20 }}>
                        Familia do Ratatouile ao molho barbecue
                    </Text>
                    <Image source={require('../../assets/icons/ty.png')} style={{ width: '90%', height: 300, marginLeft: 'auto', marginRight: 'auto' }} />
                    <Text style={{ padding: 20, }}>
                        Otimos petiscos para comer no bar acompanhado de cerveja, o molho tem leve gosto de lixo, mas ao msm tempo que mantem a doçura do sangue fresco de rato misturado com as plantas que nascem nos esgotos de N.Y
                    </Text>
                    <View style={{ height: 50, width: '90%' }} />
                </ScrollView>
            </View>
        )
    }
}