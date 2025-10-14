import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';

interface HelpSupportScreenProps {
  onBack?: () => void;
}

export default function HelpSupportScreen({ onBack }: HelpSupportScreenProps) {
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@finomini.com');
  };

  const handleChatWithUs = () => {
    // Would open chat widget
    console.log('Opening chat...');
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:+1-800-FINOMINI');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.card}>
            <TouchableOpacity style={[styles.item, styles.itemBorder]} onPress={handleChatWithUs}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>💬</Text>
                </View>
                <View>
                  <Text style={styles.itemTitle}>Live Chat</Text>
                  <Text style={styles.itemSubtitle}>Chat with our support team</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.item, styles.itemBorder]} onPress={handleContactSupport}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>✉️</Text>
                </View>
                <View>
                  <Text style={styles.itemTitle}>Email Support</Text>
                  <Text style={styles.itemSubtitle}>support@finomini.com</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={handleCallSupport}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>📞</Text>
                </View>
                <View>
                  <Text style={styles.itemTitle}>Phone Support</Text>
                  <Text style={styles.itemSubtitle}>1-800-FINOMINI</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <View style={styles.card}>
            <TouchableOpacity style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>📚</Text>
                </View>
                <View>
                  <Text style={styles.itemTitle}>Help Center</Text>
                  <Text style={styles.itemSubtitle}>Browse FAQs and guides</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>🎓</Text>
                </View>
                <View>
                  <Text style={styles.itemTitle}>Tutorials</Text>
                  <Text style={styles.itemSubtitle}>Learn how to use Finomini</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>🐛</Text>
                </View>
                <View>
                  <Text style={styles.itemTitle}>Report a Bug</Text>
                  <Text style={styles.itemSubtitle}>Help us improve</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <TouchableOpacity style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>📄</Text>
                </View>
                <View>
                  <Text style={styles.itemTitle}>Terms of Service</Text>
                  <Text style={styles.itemSubtitle}>Read our terms</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>🔒</Text>
                </View>
                <View>
                  <Text style={styles.itemTitle}>Privacy Policy</Text>
                  <Text style={styles.itemSubtitle}>How we protect your data</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>ℹ️</Text>
                </View>
                <View>
                  <Text style={styles.itemTitle}>App Version</Text>
                  <Text style={styles.itemSubtitle}>1.0.0</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Feedback Section */}
        <TouchableOpacity style={styles.feedbackButton}>
          <Text style={styles.feedbackButtonText}>💡 Send Feedback</Text>
        </TouchableOpacity>
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
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 4,
  },
  backText: {
    fontSize: 18,
    color: '#6366f1',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 50,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 22,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: '#9ca3af',
  },
  feedbackButton: {
    backgroundColor: '#6366f1',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
