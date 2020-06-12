import React, { useReducer } from 'react';
import createDataContext from "./createDataContext"

const BlogReducer = (state, action) => {
  switch (action.type) {
    case 'add_blogpost':
      return [...state,
        {
          title: action.payload.title,
          content: action.payload.content,
          id: Math.floor(Math.random() * 99999),
        }
      ]; // add an id so taht deletes can be done
    case 'delete_blogpost':
      return state.filter((post) => {
        return post.id !== action.payload
      });
    case 'edit_blogpost':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id
          ? action.payload
          : blogPost;
      });
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    dispatch({ type: 'add_blogpost', payload: { title, content } }); // dispatch isn't available in this file instead it's in createDataContext so we need to pass it in and then have that return a function closure.
    if (callback) {
      callback();
    }
  }
}; //function to dispatch an action that modifies our state. the dispatch will be the dispatch that is created by useReducer inside createDataContext

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: 'delete_blogpost', payload: id });
  }
};

const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({
      type: 'edit_blogpost',
      payload: { id, title, content }
    });
    if (callback) {
      callback()
    }
  };
};

export const { Context, Provider } =  createDataContext( // we export Context and Provider now. Context has the value and the bound actions to the reducer.
  BlogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{ title: "Test Blog Post", id: "1", content: "Test CONTENT"}]
);

