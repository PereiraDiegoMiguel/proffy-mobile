import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';


import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {

  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoriteTeachears = (JSON.parse(response));
        const favoriteTeachearsId = favoriteTeachears.map((teacher: Teacher) => {
          return teacher.id;
        });
        setFavorites(favoriteTeachearsId);
      }
    });

  }, []);

  function handleToggleFilterVisible() {
    setFiltersVisible(!filtersVisible);
  }

  async function handleFilterSubmit() {
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });
    setFiltersVisible(false);
    setTeachers(response.data);
  }

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites();
  })

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFilterVisible}>
            <Feather
              name="filter"
              size={20}
              color="#FFF"
            />
          </BorderlessButton>
        )}
      >
        {filtersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>

          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          );
        })}


      </ScrollView>
    </View>
  )
}

export default TeacherList;