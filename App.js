import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from "./src/screens/IndexScreen";
import React from 'react';
import { Provider } from "./src/context/BlogContext"
import ShowScreen from "./src/screens/ShowScreen"
import CreateScreen from "./src/screens/CreateScreen"
import EditScreen from "./src/screens/EditScreen"

const navigator = createStackNavigator({
  Index: IndexScreen,
  Show: ShowScreen,
  Create: CreateScreen,
  Edit: EditScreen,
}, {
  initialRouteName: "Index",
  defaultNavigationOptions: {
    title: "Blogs Stuff"
  }
});


const App = createAppContainer(navigator); //only requirement, must export react component, createAppContainer returns a simple component that shows teh Index component.

// we are now gonna wrap this app in a provider taht will provide state to any component. provider can use context to pass data to any nested child. App is accessible as children prop inside the BlogProvider component.
// basically we wrap the app in the provider and the context provides state to teh children.
export default () => {
  return (
    <Provider>
      <App/>
    </Provider>
  );
}