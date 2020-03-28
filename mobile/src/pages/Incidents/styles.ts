import { StyleSheet, TextStyle, ViewStyle } from "react-native"; // eslint-disable-line
import Constants from "expo-constants";

interface DetailStyle {
  container: ViewStyle;
  description: TextStyle;
  detailsButton: ViewStyle;
  detailsButtonText: TextStyle;
  header: ViewStyle;
  headerText: TextStyle;
  headerTextBold: TextStyle;
  incident: ViewStyle;
  incidentList: ViewStyle;
  incidentProperty: TextStyle;
  incidentValue: TextStyle;
  title: TextStyle;
}

export default StyleSheet.create<DetailStyle>({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  description: {
    color: `#737380`,
    fontSize: 16,
    lineHeight: 24,
  },
  detailsButton: {
    alignItems: `center`,
    flexDirection: `row`,
    justifyContent: `space-between`,
  },
  detailsButtonText: {
    color: `#e02041`,
    fontSize: 15,
    fontWeight: `bold`,
  },
  header: {
    alignItems: `center`,
    flexDirection: `row`,
    justifyContent: `center`,
  },
  headerText: {
    color: `#737380`,
    fontSize: 15,
  },
  headerTextBold: {
    fontWeight: `bold`,
  },
  incident: {
    backgroundColor: `#fff`,
    borderRadius: 8,
    marginBottom: 16,
    padding: 24,
  },
  incidentList: {
    marginTop: 32,
  },
  incidentProperty: {
    color: `#41414d`,
    fontSize: 14,
    fontWeight: `bold`,
  },
  incidentValue: {
    color: `#737380`,
    fontSize: 15,
    marginBottom: 24,
    marginTop: 8,
  },
  title: {
    color: `#13131a`,
    fontSize: 30,
    fontWeight: `bold`,
    marginBottom: 16,
    marginTop: 48,
  },
});
