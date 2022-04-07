import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import TouchableImage from '../../TouchableImage';
import Container from './Container';

import { DispatchType } from '..';
import { sandGray } from '../../../assets/styles/colors';
import {
  DesignItem,
  designs,
} from '../../../constants/capsuleDetailDesignData';

type CapsuleDesignsCardProps = {
  dispatch: DispatchType;
  parentHeight: number;
};

function CapsuleDesignsCard({
  dispatch,
  parentHeight,
}: CapsuleDesignsCardProps) {
  const _onPress = useCallback(
    (index: number) => dispatch({ type: 'SET_DESIGN', currentDesign: index }),
    [dispatch],
  );

  const maxHeight = useMemo(() => parentHeight * 0.7, [parentHeight]);

  return (
    <Container
      title={'Design'}
      style={[styles.container, { height: maxHeight }]}>
      <View style={styles.designTabBox}>
        {designs.map((item: DesignItem, index: React.Key) => (
          <TouchableImage
            onPress={() => _onPress(Number(index))}
            imgInfo={{
              source: item.source,
              width: 148,
              height: 160,
            }}
          />
        ))}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: sandGray },
  designTabBox: {},
});

export default CapsuleDesignsCard;
