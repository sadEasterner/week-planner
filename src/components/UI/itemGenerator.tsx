import './itemGenerator.css'
import * as React from 'react';
import { useEffect, useState, Fragment } from 'react';

import { BsPlusSquare } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../Store/index'
import { language } from '../../Enums/languages';
import { item } from '../../Interfaces/planInterface';
import { convertDaytoString } from '../../Helper/functions';
import { addItem } from '../../Store/plans-slice';
const ItemGenerator = () => {
    const {plan, days, ShowSettings} = useSelector((state: RootState) => state.plan);
    const [newPlan, setNewPlan] = React.useState<item>({
        day: 0,
        startTime: "",
        endTime: "",
        label: "",
        id: "",
        tag:"",
        color:"#000",
        description:""
    });
    const dispatch =  useDispatch();

    const nameBularHandler = (event: any) => {
        let label = event.target.value;
        setNewPlan({...newPlan, label})
    };
    const tagBularHandler = (event: any) => {
        let tag = event.target.value;
        setNewPlan({...newPlan, tag})
    };
    const dayBularHandler = (event: any) => {
        let day = event.target.value;
        setNewPlan({...newPlan, day: parseInt(day)})
    };
    const startTimeBularHandler = (event: any) => {
        let startTime = event.target.value;
        setNewPlan({...newPlan, startTime })
    };
    const endTimeBularHandler = (event: any) => {
        let endTime = event.target.value;
        setNewPlan({...newPlan, endTime })
    };
    const colorTimeBularHandler = (event: any) => {
        let color = event.target.value;
        setNewPlan({...newPlan, color})
    };
    const descriptionTimeBularHandler = (event: any) => {
        let description = event.target.value;
        setNewPlan({...newPlan, description})
    };
    const addNewItemHandler = () => {
        dispatch(addItem(newPlan));
    };
    useEffect(()=>{
        console.log(plan);
        
    },[plan])
    return (
        <Fragment>
            <section id="itemGeneator" className='mt-4' dir={ShowSettings.lang === language.Persian ? "rtl" : "ltr"}>
                <div className={'row newItem'}>
                    <div className='col-12 mb-4 d-flex justify-content-between'>
                        <div>
                            <h3>Add New Item</h3>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="d-flex justify-content-between mb-2">
                            <label className='c-label'>Name: </label>
                            <input className="c-input new-Item" type="text" placeholder="" onBlur={nameBularHandler} aria-label=""/>
                        </div>
                        <div className='d-flex justify-content-between mb-2'>
                            <label className='c-label me-3'>Tag: </label>
                            <select className="c-select" onChange={tagBularHandler}> 
                              <option value="1">Work</option>
                              <option value="2">Uin</option>
                              <option value="3">Tech</option>
                              <option value="4">Gym</option>
                              <option value="5">English</option>
                              <option value="6">Others</option>
                            </select>
                        </div>
                        <div className='d-flex justify-content-between mb-2'>
                            <label className='c-label me-3'>Day: </label>
                            <select className="c-select" onChange={dayBularHandler}>
                              {days.map(day => <option key={day} value={day}>{convertDaytoString(day, "Pr")}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="d-flex justify-content-between mb-2">
                            <label className='c-label'>Start Time: </label>
                            <input className="c-input new-Item" type="number" onBlur={startTimeBularHandler} placeholder="" aria-label=""/>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <label className='c-label'>End Time: </label>
                            <input className="c-input new-Item" type="number" onBlur={endTimeBularHandler} placeholder="" aria-label=""/>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <label className='c-label'>Color: </label>
                            <input type="color" className="c-colorPicker" onBlur={colorTimeBularHandler} id="ColorInput" title="Choose your color"/>
                        </div>
                    </div>
                    <div className='col-6'>
                    <div className="mb-2 h-100 c-textarea-parent">
                            <label className='c-label w-100 text-start'>Description: </label>
                            <textarea className="c-textarea" onBlur={descriptionTimeBularHandler}></textarea>
                        </div>
                    </div>
                    <div className='col-12 text-end'>
                        <button className='c-btn' onClick={addNewItemHandler}>Add</button>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default ItemGenerator; 