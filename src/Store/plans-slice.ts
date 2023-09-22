import { createSlice } from '@reduxjs/toolkit';
import { item } from '../Interfaces/planInterface';
let plans = JSON.parse(localStorage.getItem('plans')!);
interface ShowSettings {
    lang: string,
    color: string | undefined,
    totalHours: number,
    startHours: number,
}
type day = number;

interface PlanState {
    plan: item[],
    days: day[],
    ShowSettings: ShowSettings
}

const initialState: PlanState = {
    plan : plans ? plans : [],
    days: [0,1,2,3,4,5,6],
    ShowSettings: {
        lang: "en",
        color:  "",
        totalHours: 20,
        startHours: 5,
    }
}

export const planSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addItem(state, action){
        let newplan = action.payload;
        newplan.id = crypto.randomUUID();
        state.plan.push(newplan);
        
        localStorage.setItem('plans',JSON.stringify(state.plan))
    },
    removeItem(state, action){
        let id: string = action.payload;
        let i: number = 0;
        for( let item of state.plan){
            if (item.id === id){
                console.log(id);
                console.log(item.id);
                console.log(i);
                state.plan.splice(i, 1);
            } 
            i++;
        }
        
        localStorage.setItem('plans',JSON.stringify(state.plan))
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