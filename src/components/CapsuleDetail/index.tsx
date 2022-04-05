import React, { useCallback, useReducer, useState } from 'react';
import { Image, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import CapsuleDesignsCard from './CapsuleDetailCards/CapsuleDesignsCard';
import TimeSettingCard from './CapsuleDetailCards/TimeSettingCard';
import { designs } from '../../constants/capsuleDetailDesignData';
import MessageCard from './CapsuleDetailCards/MessageCard';

export type CapsuleDetailProps = {};

export type DispatchType = React.Dispatch<ActionType>;

type StateType = {
  currentDesign: number;
  timeSetting: {
    date: string;
    time: string;
    location: string;
  };
  message: {
    content: string;
    nickname: string;
  };
};

type ActionType =
  | { type: 'SET_DESIGN'; currentDesign: StateType['currentDesign'] }
  | { type: 'TIME_SETTING'; timeSetting: StateType['timeSetting'] }
  | { type: 'WRITE_MESSAGE'; message: StateType['message'] };

const initialState = {
  currentDesign: 0,
  timeSetting: {
    date: '',
    time: '',
    location: '',
  },
  message: {
    content: '',
    nickname: '',
  },
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_DESIGN':
      return {
        ...state,
        currentDesign: action.currentDesign,
      };
    case 'TIME_SETTING':
      return {
        ...state,
        timeSetting: action.timeSetting,
      };
    case 'WRITE_MESSAGE':
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
}

function CapsuleDetail({}: CapsuleDetailProps) {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [parentHeight, setParentHeight] = useState(0);

  const _onLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setParentHeight(height);
  }, []);

  const _submit = useCallback(() => {}, []);

  return (
    <View style={styles.container} onLayout={_onLayout}>
      <Image source={designs[data.currentDesign].source} />
      <CapsuleDesignsCard dispatch={dispatch} parentHeight={parentHeight} />
      <TimeSettingCard dispatch={dispatch} parentHeight={parentHeight} />
      <MessageCard
        parentHeight={parentHeight}
        dispatch={dispatch}
        submit={_submit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  cardContainer: {},
  cardTitle: {},
});

export default CapsuleDetail;
