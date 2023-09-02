import './table.css';
import { useEffect, useState, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { convertDaytoString, generateTimeString, randomColor, toPersianNumber,  } from '../helper/functions';

const WeekTable = () => {
    //state
    const [lang, setLang] = useState("en");
    const [totalH, setTotalH] = useState(24);
    const [startH, setStartH] = useState(0);

    useEffect(() => {}, []);
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
    };
    const getItemPlanLable = (id : string | undefined,lang: string | undefined ) => {
        let planItem = plan.find(i => i.id === id);
        return planItem?.label;
    };
    const getItemInPlanTime = (id : string | undefined, lang: string | undefined) => {
        let planItem = plan.find(i => i.id === id);
        if(lang=== 'Pr') return {startTime: toPersianNumber(generateTimeString(planItem?.startTime)) , endtime: toPersianNumber(generateTimeString(planItem?.endTime))};
        else return {startTime: generateTimeString(planItem?.startTime) , endtime: generateTimeString(planItem?.endTime)};
    };
    //event handler 
    const renderPresentationPerTime = (dayId: number, amount: number ) => {

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
    
                    let SHConvert = parseInt(SH) - startH;
                    let SMConvert = parseFloat(SM) / 60;
                    let EHConvert = parseInt(EH) - startH;
                    let EMConvert = parseFloat(EM) / 60;
    
                    let startPos = ((SHConvert + SMConvert) * 100) / amount;
                    let endPos = ((EHConvert + EMConvert) * 100) / amount;
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
                                lang === "Pr" && (<Fragment><span dir="ltr">{getItemInPlanTime(pos[2].toString(), lang).endtime}</span><span> تا </span><span dir="ltr">{getItemInPlanTime(pos[2].toString(), lang).startTime}</span></Fragment>)
                            }
                            {
                                lang !== "Pr" && (<Fragment><span dir="ltr">{getItemInPlanTime(pos[2].toString(), lang).startTime}</span><span> till </span><span dir="ltr">{getItemInPlanTime(pos[2].toString(), lang).endtime}</span></Fragment>)
                            }
                                    
                                    <br/>
                                    <span>{getItemPlanLable(pos[2].toString(), lang)}</span>
                        </Tooltip>
                    }>
                        <div key={dayId + 'A'} className="timeZonRow-child" style={{ position: "absolute", right: `${pos[0]}%`, width: `${pos[1]}%`,backgroundColor: `${randomColor()}` }}>
                            {getItemPlanLable(pos[2].toString(), lang)}
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
    const renderHourTitle = (amount: number) => {
        let hoursTitle = [];
        for (let i = 1; i <= amount; i++) {
            if(i + startH > 24) {
                hoursTitle.push(i-24 + startH - 1 );  
            }
            else hoursTitle.push(i + startH - 1 );
        }
        return hoursTitle.map((title, index) => <div key={index + 'H'} className="hour-column-child text-center" style={{ width: `${100 / amount}%` }} dir="ltr">{lang === "Pr" ? toPersianNumber(title + ':00') :  title + ':00'} </div>)
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
                            days.map(day => <div key={day.id + 'HT'} className="day text-center">{convertDaytoString(day.id, lang)}</div>)
                        }
                    </div>
                    <div className="d-flex hour-column">
                        {
                            renderHouersForWeek(totalH)
                        }
                    </div>
                    <div className="d-flex flex-column timeZone ">
                        <div className="timeZonRow d-flex justify-content-center pt-3" style={{ position: "relative" }}>
                        {
                                renderHourTitle(totalH)
                        }
                        </div>
                        {
                            days.map(day => <div key={day.id + 'AB'} className=" timeZonRow " style={{ position: "relative" }}>{renderPresentationPerTime(day.id, totalH)}</div>)
                        }
                    </div>
                </div>
            </div>
            </div>
            
            
        </Fragment>
    );
};

export default WeekTable; 