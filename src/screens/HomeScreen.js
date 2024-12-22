import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import Header from '../components/HomeScreen/Header';
import Slider from '../components/HomeScreen/Slider';
import Categories from '../components/HomeScreen/Categories';
import { colors } from '../global/colors';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {

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
          <Categories style={styles.categories} />
          {/* <LatestItemList style={styles.latestItemList} /> */}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

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

export default HomeScreen;
