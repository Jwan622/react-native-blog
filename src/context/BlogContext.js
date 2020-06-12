import React, { useReducer } from 'react';
import createDataContext from "./createDataContext"
import jsonServer from "../api/JsonServer"

const BlogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload; // we wholesale replace state because api is source of truth. we don't need to do ...state
      // the add case is handled by just posting to jsonServer and having the index page refetch getBlogPosts
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

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get('/blogPosts');

    dispatch({ type: 'get_blogposts', payload: response.data }) // takes object, calls reducer
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', { title, content });

    if (callback) {
      callback(); // this navigates back and on the index screen, our listener will refetch blog posts, this is more future proof.
    }
  };
}; //function to dispatch an action that modifies our state. the dispatch will be the dispatch that is created by useReducer inside createDataContext

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    // dispatch({ type: 'delete_blogpost', payload: id });
    await jsonServer.delete(`/blogposts/${id}`);

    dispatch({ type: 'delete_blogpost', payload: id })
  }
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content })

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
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);

