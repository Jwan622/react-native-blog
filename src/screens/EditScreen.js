import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from "../context/BlogContext"
import BlogPostForm from "../components/BlogPostForm"

const EditScreen = ({ navigation }) => {
  //Object {
  //   "addBlogPost": [Function _callee],
  //   "deleteBlogPost": [Function anonymous],
  //   "editBlogPost": [Function anonymous],
  //   "state": Array [
  //     Object {
  //       "content": "Test CONTENT",
  //       "id": "1",
  //       "title": "Test Blog Post",
  //     },
  //   ],
  // }
  // the above is what useContext(Context) looks like, it has all the actions and it's from createDataContext
  console.log(navigation);
  const { state, editBlogPost } = useContext(Context);
  const id = navigation.getParam('id');

  const blogPost = state.find(
    (blogPost) => blogPost.id === id // find blog post we're trying to edit
  );

  return (
    <BlogPostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) => {
        editBlogPost(id, title, content, () => navigation.pop());
      }}
    />
  )
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    fontSize: 18,
    borderColor: 'black',
  }
});

export default EditScreen;
