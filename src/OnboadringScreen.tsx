import React, { useRef, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ListRenderItem,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageSourcePropType,
  Platform,
  UIManager,
} from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

import { COLORS } from './constants/colors';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '01',
    image: require('../assets/onboarding_01.png'),
    title: 'Some title',
    subtitle: 'Some subtitle with additional information',
  },
  {
    id: '02',
    image: require('../assets/onboarding_02.png'),
    title: 'Some title',
    subtitle: 'Some subtitle with additional information',
  },
  {
    id: '03',
    image: require('../assets/onboarding_03.png'),
    title: 'Some title',
    subtitle: 'Some subtitle with additional information',
  },
];

export type SlideItemData = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
};

const OnboardingSlide: ListRenderItem<SlideItemData> = ({ item: { image, title, subtitle } }) => {
  return (
    <View style={styles.slide}>
      <Image source={image} style={styles.slideImage} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle} numberOfLines={2}>
        {subtitle}
      </Text>
    </View>
  );
};

export const OnboadringScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<FlatList>(null);

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);

    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    const offset = nextSlideIndex * width;

    ref?.current?.scrollToOffset({ offset });
  };

  const skipOnboarding = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;

    ref?.current?.scrollToOffset({ offset });
  };

  const onPressFinish = () => {
    // navigate replace
    console.log('FINISH');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={ref}
        data={slides}
        onMomentumScrollEnd={scrollHandler}
        horizontal
        pagingEnabled
        style={{ flexGrow: 2 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={OnboardingSlide}
      />

      {/* + layoutAnimation s*/}
      <View style={styles.indicatorsWrapper}>
        {slides.map((item, index) => (
          <View
            key={item.id}
            style={[styles.indicator, index === currentSlideIndex && styles.activeIndicator]}
          />
        ))}
      </View>

      <View style={styles.buttonsWrapper}>
        {currentSlideIndex === slides.length - 1 ? (
          <TouchableOpacity style={[styles.button, { width: 320 }]} onPress={onPressFinish}>
            <Text style={styles.buttonText}>FINISH</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={skipOnboarding} style={[styles.button, styles.darkButton]}>
              <Text style={[styles.buttonText, { color: COLORS.white }]}>SKIP</Text>
            </TouchableOpacity>
            <View style={{ width: 20 }} />
            <TouchableOpacity style={styles.button} onPress={goNextSlide}>
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.main,
  },
  slide: {
    width: width,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '80%',
    height: 350,
    resizeMode: 'contain',
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 20,
    marginTop: 10,
  },
  indicatorsWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  indicator: {
    height: 15,
    width: 20,
    backgroundColor: COLORS.grey,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  activeIndicator: {
    backgroundColor: COLORS.white,
    width: 30,
  },
  buttonsWrapper: {
    flex: 2,
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 5,
  },
  darkButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  buttonText: {
    fontWeight: '700',
  },
});
