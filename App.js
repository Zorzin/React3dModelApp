import {createStackNavigator, createAppContainer} from 'react-navigation';

import Model from './Views/model'
import Home from './Views/home'

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Model: {screen: Model}
});

const App = createAppContainer(MainNavigator);

export default App;