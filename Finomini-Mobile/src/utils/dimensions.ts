import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const getChartWidth = (containerPadding: number = 72) => {
  return SCREEN_WIDTH - containerPadding;
};

export const getChartContainerWidth = () => {
  return SCREEN_WIDTH - 32;
};

export const getResponsiveChartWidth = (parentWidth?: number) => {
  if (parentWidth) {
    return parentWidth - 16;
  }
  return SCREEN_WIDTH - 72;
};
