import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import CarouselRenderItemComponent from "./CarouselRenderItemComponent";

const screenWidth = Dimensions.get("window").width;

const CarouselWithIndicators = ({
  carouselHeight,
  carouselWidth,
  carouselSlides,
  theme = { theme },
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <View>
      <Carousel
        height={carouselHeight}
        width={carouselWidth}
        data={carouselSlides}
        renderItem={({ item, index }) => (
          <CarouselRenderItemComponent
            item={item}
            currentIndex={currentIndex}
            index={index}
          />
        )}
        onSnapToItem={handleSlideChange}
        on
      />

      {/* Indicator */}
      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        {carouselSlides.map((_, index) => (
          <View
            key={index}
            style={{
              height: screenWidth * 0.025,
              width: screenWidth * 0.025,
              borderRadius: 30,
              backgroundColor:
                index === currentIndex
                  ? theme.colors.primary
                  : "rgba(255, 255, 255, 0.5)",
              marginHorizontal: 5, // Adjust as needed
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default CarouselWithIndicators;
