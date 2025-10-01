import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const getChartWidth = () => {
  return SCREEN_WIDTH - 40;
};

export const getChartContainerWidth = () => {
  return SCREEN_WIDTH - 32;
};
