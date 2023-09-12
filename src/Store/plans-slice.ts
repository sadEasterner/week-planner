import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
interface ShowSettings {
    lang: string,
    color: string | undefined,
    totalHours: number,
    startHours: number,
}
interface day {
    id: number,
}
interface item {
    day: number
    startTime: string;
    endTime: string;
    label: string;
    id: string;
}
interface PlanState {
    plan: item[],
    days: day[],
    ShowSettings: ShowSettings
}

const initialState: PlanState = {
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
    ],
    days: [
        {id:0},
        {id:1},
        {id:2},
        {id:3},
        {id:4},
        {id:5},
        {id:6},
    ],
    ShowSettings: {
        lang: "en",
        color:  "",
        totalHours: 24,
        startHours: 0,
    }
}

export const planSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addItem(state, action){
        state.plan.push(action.payload);
    },
    removeItem(state, action){
        let id: string = action.payload.id;
        for( let item of state.plan){
            let i: number = 0;
            if (item.id === id) state.plan.splice(i, 1);
            i++;
        }
    },
    editItem(state, action){
        let id: string = action.payload.id;
        let newItem: any,{} = action.payload.newItem;
        state.plan.filter(item => item.id !== id ).push(newItem)
    },
  }
})

export const {editItem, removeItem, addItem} = planSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default planSlice;