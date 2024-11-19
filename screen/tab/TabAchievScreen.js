import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import TabLayou from '../../components/layout/TabLayou'
import { useContextApp } from '../../store/context'
import Icon from 'react-native-vector-icons/FontAwesome5'

const ACHIEVEMENTS = [
  {
    id: 'firstCollection',
    title: 'First collection',
    description: 'Create your first collection',
    points: 25,
    icon: '🏆',
  },
  {
    id: 'firstItem',
    title: 'First item',
    description: 'Create your first item',
    points: 30,
    icon: '🏆',
  },
  {
    id: 'collector10Items',
    title: 'Collector of 10 items',
    description: 'Create your first collection',
    points: 50,
    icon: '🏆',
  },
  // Add more achievements as needed
]

const TabAchievScreen = () => {
  const { achievements, scores } = useContextApp()

  return (
    <TabLayou>

    
    {/* <View style={styles.container}> */}
        {/* Header with total points */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Achievements & progress</Text>
          <View style={styles.pointsCard}>
            <Text style={styles.pointsTitle}>Win Points</Text>
            <View style={styles.pointsRow}>
              <Text style={styles.points}>{scores}</Text>
              <Icon name="coins" size={24} color="#FFD700" />
            </View>
          </View>
        </View>

      <ScrollView>
        {/* Achievement list */}
        {ACHIEVEMENTS.map((achievement) => (
          <View 
            key={achievement.id} 
            style={[
              styles.achievementCard,
              !achievements[achievement.id] && styles.achievementLocked
            ]}
          >
            <View style={styles.achievementIcon}>
              <Text style={styles.iconText}>{achievement.icon}</Text>
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: achievements[achievement.id] ? '100%' : '0%' }
                  ]} 
                />
              </View>
            </View>
            <Text style={styles.achievementPoints}>+{achievement.points}</Text>
          </View>
        ))}
      </ScrollView>
    {/* </View> */}
    </TabLayou>
  )
}

export default TabAchievScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  pointsCard: {
    backgroundColor: '#1a237e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  pointsTitle: {
    color: '#fff',
    fontSize: 16,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  points: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#1a237e',
    margin: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  achievementDescription: {
    color: '#9e9e9e',
    fontSize: 12,
  },
  achievementPoints: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#424242',
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196f3',
    borderRadius: 2,
  },
})