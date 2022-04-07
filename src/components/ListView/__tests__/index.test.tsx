import { render } from '@testing-library/react-native';
import ListView from '..';

const onEndReached = () => console.log('onEndReached Triggered');

test('ListView 렌더링 테스트', () => {
  const { findAllByText } = render(
    <ListView items={[]} onEndReached={onEndReached} />,
  );
});
