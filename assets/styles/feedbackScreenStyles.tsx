import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 16,
    marginVertical: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  emoji: {
    fontSize: 30,
  },
  selectedEmoji: {
    fontSize: 30,
    color: '#00aaff',
  },
  commentBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    textAlignVertical: 'top',
  },
  recommendationRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  recommendation: {
    fontSize: 18,
  },
  selectedRecommendation: {
    fontSize: 18,
    color: '#ffb300',
  },
  submitButton: {
    backgroundColor: '#ffb300',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

  export default styles;