import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from "./src/screens/IndexScreen";
import React from 'react';
import { BlogProvider } from "./src/context/BlogContext" //since BlogProivder was  named export and not the default, we need to use {}

const navigator = createStackNavigator({
  Index: IndexScreen,
}, {
  initialRouteName: "Index",
  defaultNavigationOptions: {
    title: "Blogs Stuff"
  }
});


const App = createAppContainer(navigator); //only requirement, must export react component, createAppContainer returns a simple component that shows teh Index component.

// we are now gonna wrap this app in a provider taht will provide state to any component. provider can use context to pass data to any nested child. App is accessible as children prop inside the BlogProvider component.
export default () => {
  return (
    <BlogProvider>
      <App />
    </BlogProvider>
  )
}