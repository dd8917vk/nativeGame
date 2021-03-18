import React, {useEffect, useState, useRef} from 'react';
import RandomNumber from './RandomNumber';
import {View, Text, StyleSheet, Button} from 'react-native';

const Game = props => {
  const [selected, setSelected] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(
    props.initialSeconds,
  );
  const selectNumber = index => {
    // setSelected(selected.concat(index));
    const newSelected = selected.slice();
    newSelected.push(index);
    setSelected(newSelected);
  };

  // const randNumArray = Array.from({length: props.randomNumber}).map(
  //   () => 1 + Math.floor(10 * Math.random()),
  // );

  const isNumSelected = index => {
    return selected.indexOf(index) >= 0;
  };
  // const target = props.randNumArray
  //   .slice(0, props.randomNumber - 3)
  //   .reduce((acc, cur) => acc + cur);

  const gameStatus = () => {
    const sumSelected = selected.reduce((acc, cur) => {
      return acc + props.randNumArray[cur];
    }, 0);
    if (remainingSeconds === 0) {
      return 'LOST';
    } else if (sumSelected < props.target) {
      return 'PLAYING';
    } else if (sumSelected === props.target) {
      return 'WON';
    } else {
      return 'LOST';
    }
  };
  // const isZero = () => {
  //   if (remainingSeconds === 0) {
  //     clearInterval(timer);
  //   }
  // };
  const interval = useRef();
  useEffect(() => {
    interval.current = setInterval(() => {
      setRemainingSeconds(prevCount => prevCount - 1);
    }, 1000);
  }, []);

  if (
    remainingSeconds === 0 ||
    gameStatus() === 'LOST' ||
    gameStatus() === 'WON'
  ) {
    clearInterval(interval.current);
  }

  return (
    <View style={styles.container}>
      <View style={styles.target}>
        <Text style={styles.text}>{props.target}</Text>
      </View>
      <View style={styles.randomContainer}>
        {props.randNumArray.map((num, index) => {
          return (
            // <Text key={index} style={styles.randomNum}>
            //   {num}
            // </Text>
            <RandomNumber
              key={index}
              id={index}
              num={num}
              isDisabled={isNumSelected(index) || gameStatus() !== 'PLAYING'}
              onPress={selectNumber}
            />
          );
        })}
      </View>
      <Button onPress={props.reset} title="Play Again" color="purple" />
      <Text style={styles.seconds}>{remainingSeconds}</Text>
      <Text style={(styles.target, styles[`status${gameStatus()}`])}>
        {gameStatus()}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
    flex: 1,
    paddingTop: 30,
    marginTop: 40,
  },
  target: {
    fontSize: 40,
    backgroundColor: '#FF1493',
    marginHorizontal: 50,
    textAlign: 'center',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'whitesmoke',
    fontSize: 40,
  },
  randomContainer: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  statusPLAYING: {
    marginBottom: 50,
    backgroundColor: 'yellow',
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  statusWON: {
    marginBottom: 50,
    backgroundColor: 'green',
    textAlign: 'center',
    color: 'whitesmoke',
    fontSize: 40,
  },
  statusLOST: {
    marginBottom: 50,
    backgroundColor: 'red',
    textAlign: 'center',
    color: 'whitesmoke',
    fontSize: 40,
  },
  seconds: {
    marginBottom: 10,
    backgroundColor: '#FF1493',
    textAlign: 'center',
    color: 'whitesmoke',
    fontSize: 40,
  },
});

export default Game;
