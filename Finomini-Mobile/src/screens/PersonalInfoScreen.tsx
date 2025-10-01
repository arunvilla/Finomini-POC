import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';

interface PersonalInfoScreenProps {
  onBack: () => void;
}

export default function PersonalInfoScreen({ onBack }: PersonalInfoScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Taylor',
    lastName: 'Saver',
    email: 'taylorsaver@gmail.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '01/15/1990',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validateDateOfBirth = (dob: string) => {
    const dobRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    return dobRegex.test(dob);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone format (e.g., (555) 123-4567)';
    }
    if (formData.dateOfBirth && !validateDateOfBirth(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Invalid date format (MM/DD/YYYY)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors before saving');
      return;
    }
    setIsEditing(false);
    setErrors({});
    Alert.alert('Success', 'Personal information updated successfully');
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
        <TouchableOpacity
          onPress={() => setIsEditing(!isEditing)}
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>TS</Text>
          </View>
          {isEditing && (
            <TouchableOpacity style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>First Name *</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled, errors.firstName && styles.inputError]}
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              editable={isEditing}
              placeholderTextColor="#9ca3af"
            />
            {errors.firstName && isEditing && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Last Name *</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled, errors.lastName && styles.inputError]}
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              editable={isEditing}
              placeholderTextColor="#9ca3af"
            />
            {errors.lastName && isEditing && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Email Address *</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled, errors.email && styles.inputError]}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              editable={isEditing}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
            />
            {errors.email && isEditing && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            {isEditing && !errors.email && (
              <Text style={styles.fieldHint}>
                Changes to email will require verification
              </Text>
            )}
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Phone Number *</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled, errors.phone && styles.inputError]}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              editable={isEditing}
              keyboardType="phone-pad"
              placeholderTextColor="#9ca3af"
            />
            {errors.phone && isEditing && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Date of Birth</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled, errors.dateOfBirth && styles.inputError]}
              value={formData.dateOfBirth}
              onChangeText={(value) => handleInputChange('dateOfBirth', value)}
              editable={isEditing}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#9ca3af"
            />
            {errors.dateOfBirth && isEditing && (
              <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Street Address</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              editable={isEditing}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.fieldRow}>
            <View style={[styles.fieldCard, styles.fieldCardFlex]}>
              <Text style={styles.fieldLabel}>City</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.city}
                onChangeText={(value) => handleInputChange('city', value)}
                editable={isEditing}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={[styles.fieldCard, styles.fieldCardSmall]}>
              <Text style={styles.fieldLabel}>State</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.state}
                onChangeText={(value) => handleInputChange('state', value)}
                editable={isEditing}
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>ZIP Code</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.zipCode}
              onChangeText={(value) => handleInputChange('zipCode', value)}
              editable={isEditing}
              keyboardType="number-pad"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {isEditing && (
          <View style={styles.section}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#1f2937',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  changePhotoButton: {
    paddingVertical: 8,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  fieldRow: {
    flexDirection: 'row',
    gap: 12,
  },
  fieldCardFlex: {
    flex: 1,
  },
  fieldCardSmall: {
    width: 100,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  input: {
    fontSize: 15,
    color: '#1f2937',
    padding: 0,
  },
  inputDisabled: {
    color: '#6b7280',
  },
  inputError: {
    borderBottomWidth: 2,
    borderBottomColor: '#dc2626',
  },
  errorText: {
    fontSize: 12,
    color: '#dc2626',
    marginTop: 4,
  },
  fieldHint: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
