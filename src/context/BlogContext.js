import React from 'react';

const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => { // unrelated to provider, children is like the component nested within a custom component. It's like yield in Ruby and children is whatever is yielded to. It will show up in the Custom component as a prop called children. So here, BlogProvider is a component that will accept another component as children.
  return <BlogContext.Provider>{children}</BlogContext.Provider>
};

