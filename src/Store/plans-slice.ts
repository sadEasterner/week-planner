import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

// Define a type for the slice state
interface item {
    day: number
    startTime: string;
    endTime: string;
    label: string;
    id: string;
}
interface CounterState {
    plan: item[]
}

// Define the initial state using that type
const initialState: CounterState = {
    plan : [
        {
            day: 0,
            startTime: '800',
            endTime: '1300',
            label: 'Math1',
            id:'#1111'
        },
        {
            day: 4,
            startTime: '930',
            endTime: '1645',
            label: 'Math2',
            id:'#1112'
        },
        {
            day: 2,
            startTime: '1140',
            endTime: '1750',
            label: 'English',
            id:'#1113'
        }
    ]
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

  }
})

export const { } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice;