import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { colors } from '../theme/colors';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  color?: string;
  label?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 120,
  color = colors.primary,
  label,
}) => {
  const data = [
    { value: percentage, color: color },
    { value: 100 - percentage, color: colors.border },
  ];

  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        donut
        radius={size / 2}
        innerRadius={size / 2 - 15}
        centerLabelComponent={() => (
          <View style={styles.centerLabel}>
            <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
          </View>
        )}
      />
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: colors.text.secondary,
  },
});
