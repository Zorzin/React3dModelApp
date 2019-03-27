import React, {Component} from 'react';
import ModelView from 'react-native-gl-model-view';
import { Animated, Easing } from 'react-native';
const AnimatedModelView = Animated.createAnimatedComponent(ModelView);

import {
  setUpdateIntervalForType,
  SensorTypes,
  accelerometer
} from "react-native-sensors";


function accelerometerData() {
  setUpdateIntervalForType(SensorTypes.accelerometer, 150);

  return accelerometer
}

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      x:new Animated.Value(2),
      y:0,
      zoom: new Animated.Value(-2),
    };
    Object.keys(this.state).forEach(key =>
      this.state[key] instanceof Animated.Value &&
      this.state[key].__makeNative()
    );
     this.getAccelerometerData();
  }

  async getAccelerometerData() {
    const accelerometer = await accelerometerData();

    accelerometer.subscribe(({ x, y, z }) => {
      console.log(new Animated.Value(x));
      this.setState({ x:new Animated.Value(x)});
      this.setState({ y:new Animated.Value(y)});
    });
  }

  render() {
    return (
      <AnimatedModelView
        model="robot.obj"
        texture="bucket.png"

        scale={1}

        rotateZ={180}
        rotateY={90}
        animate={true}
        translateZ={-5}
        tramslateX={this.state.x*10}
        tramslateY={this.state.y*10}
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