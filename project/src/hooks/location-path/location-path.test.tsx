import { renderHook } from '@testing-library/react';
import useCurrentLocation from './location-path';

describe('Hook: useCurrentLocation', () => {
  it('should return object with 5 elements', () => {
    const { result } = renderHook(() => useCurrentLocation());
    // console.log(result);
    // const [answers, handleAnswerChange] = result.current;
    // expect(result.current).toHaveLength(2);
    // expect(answers).toBeInstanceOf(Array);
    // expect(handleAnswerChange).toBeInstanceOf(Function);
  });
});
