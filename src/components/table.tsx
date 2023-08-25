import './table.css';
import { useEffect, useState, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { toPersianNumber,  } from '../helper/functions';

const WeekTable = () => {
    //state
    type item ={
        day: number
        startTime: string;
        endTime: string;
        label: string;
        id: string;
    }
    type plan = item[];
    let days = [
        { id: 0, title: "شنبه" },
        { id: 1, title: "یک‌شنبه" },
        { id: 2, title: "دوشنبه" },
        { id: 3, title: "سه‌شنبه" },
        { id: 4, title: "چهارشنبه" },
        { id: 5, title: "پنج‌شنبه" },
        { id: 6, title: "جمعه" },
    ];
    const plan = [
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
    ];
    const getItemInPlan = (id : string) => {
        return plan.find(i => i.id === id)
    }
    //event handler 
    const renderPresentationPerTime = (dayId: number ) => {

        if (plan) {
            // index --> 0: start pos / 1: width / 2: ppresentation
            type positions = [number, number ,string | undefined]
            let positions = [];
            for (let item of plan) {
                if(item.day === dayId){
                    let startTime = item.startTime + '';
                    let endTime = item.endTime + '';
                    let SH, SM, EH, EM;
                    let startT = startTime.padStart(4, "0");
                    let endT = endTime.padStart(4, "0");
    
                    SH = startT[0] + startT[1];
                    SM = startT[2] + startT[3];
    
                    EH = endT[0] + endT[1];
                    EM = endT[2] + endT[3];
    
                    let SHConvert = parseInt(SH) - 6;
                    let SMConvert = parseFloat(SM) / 60;
                    let EHConvert = parseInt(EH) - 6;
                    let EMConvert = parseFloat(EM) / 60;
    
                    let startPos = ((SHConvert + SMConvert) * 100) / 17;
                    let endPos = ((EHConvert + EMConvert) * 100) / 17;
                    let W = endPos - startPos;
                    let pId = item.id;
                    positions.push([startPos, W, pId]);
                }
                
            }
            return (positions.map(pos =>
                <Fragment>
                <OverlayTrigger
                    key={dayId + "GF"}
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    containerPadding={20}
                    overlay={
                        <Tooltip id="custom-tooltip">
                            {
                                <Fragment>
                                    <span dir="ltr">{pos[2]}</span><span> تا </span><span dir="ltr">{pos[2]}</span>
                                    <br/>
                                    <span>{pos[2]}</span>
                                </Fragment>
                            }
                        </Tooltip>
                    }>
                        <div key={dayId + 'A'} className="timeZonRow-child" style={{ position: "absolute", right: `${pos[0]}%`, width: `${pos[1]}%` }}>
                            {getItemInPlan(pos[2].toString())?.label}
                        </div>
                    </OverlayTrigger>
                    
                </Fragment>
            ))
        }
    }
    const renderHouersForWeek = (amount: number) => {
        let hour = Array(amount).fill('0');
        return hour.map((h, index) => <div key={index + 'H'} className="hour-column-child" style={{ width: `${100 / amount}%` }}></div>)
    };
    const renderHourTitle = () => {
        let hoursTitle = [];
        for (let i = 1; i <= 17; i++) {
            hoursTitle.push(i + 6);
        }
        return hoursTitle.map((title, index) => <div key={index + 'H'} className="hour-column-child text-center" style={{ width: `${100 / 17}%` }} dir="ltr">{title} : 00</div>)
    }
    const renderDetailModal = () => {
    
    };
    return (
        <Fragment>
            <div className='modal-weeklyView w-100'>
            <div className="modal-weeklyView-body">
                <div className="week m-3  d-flex " style={{ position: "relative"}}>
                    <div className="days d-flex flex-column ">
                        <div className="day p-3 text-center" >#
                        </div>
                        {
                            days.map(day => <div key={day.id + 'HT'} className="day text-center">{day.title}</div>)
                        }
                    </div>
                    <div className="d-flex hour-column">
                        {
                            renderHouersForWeek(17)
                        }
                    </div>
                    <div className="d-flex flex-column timeZone ">
                        <div className="timeZonRow d-flex justify-content-center pt-3" style={{ position: "relative" }}>
                        {
                                renderHourTitle()
                        }
                        </div>
                        {
                            days.map(day => <div key={day.id + 'AB'} className=" timeZonRow " style={{ position: "relative" }}>{renderPresentationPerTime(day.id)}</div>)
                        }
                    </div>
                </div>
            </div>
            </div>
            
            
        </Fragment>
    );
};

export default WeekTable; 