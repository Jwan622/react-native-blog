import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Context } from "../context/BlogContext";
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context); // this Context is from BlogContext and has the value and bound actions to hte reducer.

  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener('didFocus', () => {// we have to add a listened because useEffect function is only called one time  when screen is rendered. When we navigate, the screen is still there and so when we navigate back, it still exists. so when we navigate back, it's the still instnace and useEffect is not called again. instead, below, use a listener.
      getBlogPosts();
    });

    return () => {
      listener.remove(); // gets called when screen is removed, not just invisible. gets invoked when screen is removed.
    }
  }, []); //this empty array ensures function is only called one time when component first shows up on screen. be careful though because if we navigate back, it won't call so new data that's created may not refreshl. So to fix that we use navigation.addListener('didFocus', () => ) which tells navigation that if screen gainst focus, this callback gets called. we alos clean up listener too.

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title }
        renderItem={({ item }) => { // item is a blog post object with title and id
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Show', {id: item.id})}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title} - {item.id}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  }
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24,
  }
});

export default IndexScreen;