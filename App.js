import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from 'expo-constants';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  async getItems() {
    try {
      const response = await fetch("http://10.220.56.12:8080/items");
      const json = await response.json()
      this.setState({ data: json.items });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getItems();
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <Text>
                {item.name}, {item.description},{item.price}
              </Text>
            )}
          />
        )}
        <StatusBar style="auto" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});