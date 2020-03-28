import { StyleSheet, TextStyle, ViewStyle } from "react-native"; // eslint-disable-line
import Constants from "expo-constants";

interface DetailStyle {
  action: ViewStyle;
  actions: ViewStyle;
  actionText: TextStyle;
  contactBox: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  heroDescription: TextStyle;
  heroTitle: TextStyle;
  incident: ViewStyle;
  incidentList: ViewStyle;
  incidentProperty: TextStyle;
  incidentValue: TextStyle;
}

export default StyleSheet.create<DetailStyle>({
  action: {
    alignItems: `center`,
    backgroundColor: `#e02041`,
    borderRadius: 8,
    height: 50,
    justifyContent: `center`,
    width: `48%`,
  },
  actions: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    marginTop: 16,
  },
  actionText: {
    color: `#fff`,
    fontSize: 15,
    fontWeight: `bold`,
  },
  contactBox: {
    backgroundColor: `#fff`,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 48,
    padding: 24,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  header: {
    alignItems: `center`,
    flexDirection: `row`,
    justifyContent: `space-between`,
  },
  heroDescription: {
    color: `#737380`,
    fontSize: 15,
    marginTop: 16,
  },
  heroTitle: {
    color: `#13131a`,
    fontSize: 20,
    fontWeight: `bold`,
    lineHeight: 30,
  },
  incident: {
    backgroundColor: `#fff`,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 48,
    padding: 24,
  },
  incidentList: {
    marginTop: 32,
  },
  incidentProperty: {
    color: `#41414d`,
    fontSize: 14,
    fontWeight: `bold`,
    marginTop: 24,
  },
  incidentValue: {
    color: `#737380`,
    fontSize: 15,
    marginTop: 8,
  },
});
