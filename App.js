import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import ModelView from 'react-native-gl-model-view';
import { Animated, Easing } from 'react-native';
const AnimatedModelView = Animated.createAnimatedComponent(ModelView);

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      zoom: new Animated.Value(0),
    };
    Object.keys(this.state).forEach(key =>
      this.state[key] instanceof Animated.Value &&
      this.state[key].__makeNative()
    );
  }

  render() {
    return (
      <ModelView
        model="model.obj"
        texture="texture.png"

        scale={0.01}

        rotateZ={270}
        animate={true}
        translateZ={this.state.zoom}
        style={{flex: 1}}
      />
    );
  }

  componentDidMount() {
    Animated.timing(this.state.zoom, {
      toValue: -2,
      useNativeDriver: true,
      duration: 2000,
      easing: Easing.bounce
    }).start();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
