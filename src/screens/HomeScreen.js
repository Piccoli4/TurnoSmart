import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import Header from '../components/HomeScreen/Header';
import Slider from '../components/HomeScreen/Slider';
import Categories from '../components/HomeScreen/Categories';
import AllApointments from '../components/HomeScreen/AllAppointments';
import { colors } from '../global/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useGetUserQuery } from '../services/user';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';

const HomeScreen = () => {

  const localId = useSelector(state => state.auth.localId);
  const {data, error, isLoading} = useGetUserQuery(localId)
  
  // Extrae solo el role del objeto data
  const role = data?.role

  if (isLoading) { return <Loading/> }

  return (
    <LinearGradient
      colors={['#C70000', '#FFFFFF', '#FFFFFF', '#022974']}
      locations={[0, 0.20, 0.65, 0.95]}
      style={styles.background}
    >
      <View style={styles.container}>
        <Header style={styles.header}/>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Slider style={styles.slider} />
          {role === 'user' && <Categories style={styles.categories} />}
          {role === 'admin' && <AllApointments style={styles.allApointments} />}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: 15
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20
  },
  noProductsTextContainer: {
    width: '90%',
    height: 100,
    alignSelf: 'center',
    marginTop: 100,
    borderWidth: 1.5,
    borderColor: colors.violet,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noProductsText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.violet,
    textShadowColor: '#000',
    textShadowOffset: {width: 0.9, height: 0.9},
    textShadowRadius: 1
  }
});