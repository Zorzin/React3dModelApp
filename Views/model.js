import React, {Component} from 'react';
import ModelView from 'react-native-gl-model-view';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { Animated, Easing } from 'react-native';
const AnimatedModelView = Animated.createAnimatedComponent(ModelView);
import {
  setUpdateIntervalForType,
  SensorTypes,
  accelerometer
} from "react-native-sensors";

setUpdateIntervalForType(SensorTypes.accelerometer, 100);

type Props = {};
export default class Model extends Component<Props> {

  subscription = null;

  constructor(props) {
    super(props);

    this.state = {
      model:'robot.obj',
      translateX:new Animated.Value(0),
      translateY:new Animated.Value(0),
      zoom: new Animated.Value(-2),
      uiPosition: new Animated.Value(50)
    };
    Object.keys(this.state).forEach(key =>
      this.state[key] instanceof Animated.Value &&
      this.state[key].__makeNative()
    );
  }

  render() {
    const {navigation} = this.props;
    const {name} = navigation.state.params;
    const {translateX, translateY} = this.state;
    return (
      <View style={styles.container}>
        <AnimatedModelView
          animate
          model={`${name}.obj`}
          texture="bucket.png"

          scale={0.3}

          rotateZ={180}
          rotateY={90}
          translateZ={-1}
          translateX={translateX}
          translateY={translateY}
          style={{flex: 1}}
        />
      </View>
    );
  }

  renderButton(label, method) {
    return (
      <TouchableOpacity onPress={method}>
        <Text >{label}</Text>
      </TouchableOpacity>
    );
  }

  componentDidMount(): void  {
    this.subscription = accelerometer.subscribe(({ x, y, z }) => {
      console.log(x);
      const {translateX, translateY} = this.state;

      Animated.timing(translateY, {
        toValue: y/5,
        useNativeDriver: true,
        duration: 1
      }).start();

      Animated.timing(translateX, {
        toValue: -x,
        useNativeDriver: true,
        duration: 1
      }).start();


    });
  }
  componentWillUnmount(): void {
    this.subscription.unsubscribe();
  }

  openBucket() {

    this.setState({model:'bucket.obj'})
  }

  openShovel() {
    this.setState({model:'shovel.obj'})
  }

  openRobot() {
    this.setState({model:'robot.obj'})
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  view: {
    flex: 1,
    backgroundColor: '#ffe2e2'
  },
  buttons: {
    height: 50,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 12
  }
});