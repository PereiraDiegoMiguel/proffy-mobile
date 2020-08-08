import React from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  cost: number;
  subject: string;
  whatsapp: string;
}


function TeacherItem() {
  return (
    <View style={styles.container}>

      <View style={styles.profile}>

        <Image
          style={styles.avatar}
          source={{ uri: 'https://avatars2.githubusercontent.com/u/63316292?s=460&u=b10e1c99b3fb8ab3cccfbf9c450dfd93ee928cde&v=4' }}
        />

        <View style={styles.profileInfo} >
          <Text style={styles.name}>Diego Pereira</Text>
          <Text style={styles.subject}>Quimica</Text>
        </View>

      </View>

      <Text style={styles.bio}>
        Entusiasta das melhores tecnologias de química avançada.
          {'\n'}{'\n'}
          Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
        </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'  '}
          <Text style={styles.priceValue}>R$ 20,00</Text>
        </Text>

        <View style={styles.buttonsContainer}>

          <RectButton style={[styles.favoriteButton, styles.favorite]}>
            <Image source={unfavoriteIcon} />

          </RectButton>

          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>

        </View>
      </View>
    </View>
  );
}

export default TeacherItem;