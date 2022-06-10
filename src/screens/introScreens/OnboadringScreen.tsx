import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  LayoutAnimation,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, THEME_COLORS } from '../../constants';
import { StackParams } from '../../navigation';
import { START_SCREEN } from '../../navigation/constants';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '01',
    image: require('../../../assets/onboarding_01.png'),
    title: 'Some title',
    subtitle: 'Some subtitle with additional information',
  },
  {
    id: '02',
    image: require('../../../assets/onboarding_02.png'),
    title: 'Some title',
    subtitle: 'Some subtitle with additional information',
  },
  {
    id: '03',
    image: require('../../../assets/onboarding_03.png'),
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
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={2}>
        {subtitle}
      </Text>
    </View>
  );
};

export const OnboadringScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<FlatList>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    setCurrentSlideIndex(0);
    isFocused && ref?.current?.scrollToOffset({ offset: 0 });
  }, [isFocused]);

  const scrollHandler = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);

    setCurrentSlideIndex(currentIndex);
  }, []);

  const onPressNext = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const nextSlideIndex = currentSlideIndex + 1;
    const offset = nextSlideIndex * width;

    ref?.current?.scrollToOffset({ offset });

    if (Platform.OS === 'android') {
      setCurrentSlideIndex(nextSlideIndex);
    }
  }, [currentSlideIndex]);

  const onPressSkip = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;

    ref?.current?.scrollToOffset({ offset });

    if (Platform.OS === 'android') {
      setCurrentSlideIndex(lastSlideIndex);
    }
  }, []);

  const onPressFinish = useCallback(() => {
    navigation.navigate(START_SCREEN);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={ref}
        data={slides}
        onMomentumScrollEnd={scrollHandler}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={OnboardingSlide}
      />
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
          <TouchableOpacity style={[styles.button]} onPress={onPressFinish}>
            <Text style={styles.buttonText}>FINISH</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonsInnerWrapper}>
            <TouchableOpacity onPress={onPressSkip} style={[styles.button, styles.darkButton]}>
              <Text style={[styles.buttonText, { color: THEME_COLORS.dark.text }]}>SKIP</Text>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity style={styles.button} onPress={onPressNext}>
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
    backgroundColor: THEME_COLORS.dark.background,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: '100%',
    padding: 10,
  },
  slideImage: {
    width: '80%',
    height: 350,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: THEME_COLORS.dark.text,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 20,
    color: THEME_COLORS.dark.text,
  },
  indicatorsWrapper: {
    flexDirection: 'row',
    paddingVertical: 40,
  },
  indicator: {
    height: 15,
    width: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
  },
  activeIndicator: {
    width: 30,
    backgroundColor: THEME_COLORS.dark.text,
  },
  buttonsWrapper: {
    justifyContent: 'center',
    paddingVertical: 40,
  },
  buttonsInnerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 150,
    borderRadius: 5,
    backgroundColor: THEME_COLORS.dark.text,
  },
  darkButton: {
    borderWidth: 1,
    borderColor: THEME_COLORS.dark.text,
    backgroundColor: COLORS.transparent,
  },
  buttonText: {
    fontWeight: '700',
    color: THEME_COLORS.light.text,
  },
  spacing: {
    width: 20,
  },
});
