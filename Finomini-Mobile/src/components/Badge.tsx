import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({ 
  label, 
  variant = 'neutral', 
  size = 'md',
  style 
}) => {
  const badgeStyleKey = `badge${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles;
  const textStyleKey = `text${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles;

  return (
    <View style={[
      styles.badge,
      size === 'sm' && styles.badgeSm,
      styles[badgeStyleKey] as ViewStyle,
      style,
    ]}>
      <Text style={[
        styles.text,
        size === 'sm' && styles.textSm,
        styles[textStyleKey] as TextStyle,
      ]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badgeSuccess: {
    backgroundColor: colors.success[100],
  },
  badgeWarning: {
    backgroundColor: colors.warning[100],
  },
  badgeDanger: {
    backgroundColor: colors.danger[100],
  },
  badgeInfo: {
    backgroundColor: colors.primary[100],
  },
  badgeNeutral: {
    backgroundColor: colors.gray[100],
  },
  text: {
    ...typography.label,
    fontWeight: '600',
  },
  textSm: {
    ...typography.caption,
    fontWeight: '600',
  },
  textSuccess: {
    color: colors.success[700],
  },
  textWarning: {
    color: colors.warning[700],
  },
  textDanger: {
    color: colors.danger[700],
  },
  textInfo: {
    color: colors.primary[700],
  },
  textNeutral: {
    color: colors.gray[700],
  },
});
