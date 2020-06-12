import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

// three things that are different, submit function, intial form values, labels.
const BlogPostForm = ({ onSubmit, initialValues }) => { //initialValues is null from the create Screen
  const [title, setTitle] = useState(initialValues.title); //even though we're using context, we still need local state to store teh form values
  const [content, setContent] = useState(initialValues.content);

  return (
    <View>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Button
        title="Save Blog Post"
        onPress={() => onSubmit(title, content)}
      />
    </View>
  )
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: '',
    content: '',
  }
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 5,
  }
});

export default BlogPostForm;