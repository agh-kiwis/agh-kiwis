import React from 'react';
import { RootState } from '../../../client/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './CounterSlice';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="container">
        <ButtonGroup>
          <Button
            colorScheme="blue"
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </Button>
          <Button
            colorScheme="blue"
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </Button>
        </ButtonGroup>
        <Box m={2}>
          <h1>{count}</h1>
        </Box>
      </div>
    </div>
  );
}
