import './table.css';
import { useEffect, useState, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { useSelector, useDispatch } from 'react-redux';
import { convertDaytoString, generateTimeString, randomColor, toPersianNumber,  } from '../Helper/functions';
import type { RootState } from '../Store/index'
import { language } from '../Enums/languages';
import { removeItem } from '../Store/plans-slice';

const WeekTable = () => {
    
    
    //state
    const {plan, days, ShowSettings} = useSelector((state: RootState) => state.plan);

    const [lang, setLang] = useState("Pr");
    // hooks 
    const dispatch = useDispatch();

    useEffect(() => {}, []);

    const getItemInPlan = (id : string) => {
        return plan.find(i => i.id === id)
    };
    const getItemPlanLable = (id : string | undefined, lang: string | undefined ) => {
        let planItem = plan.find(i => i.id === id);
        return planItem?.label;
    };
    const getItemPlanColor = (id : string | undefined,) => {
        let planItem = plan.find(i => i.id === id);
        return planItem?.color;
    };
    const getItemInPlanTime = (id : string | undefined, lang: string | undefined) => {
        let planItem = plan.find(i => i.id === id);
        if(language.Persian === lang) return {startTime: toPersianNumber(generateTimeString(planItem?.startTime)) , endtime: toPersianNumber(generateTimeString(planItem?.endTime))};
        else return {startTime: generateTimeString(planItem?.startTime) , endtime: generateTimeString(planItem?.endTime)};
    };
    //event handler 
    const deleteItem = (event: any) => {
        event.preventDefault()
        let id = event.target.getAttribute("data-item");
        dispatch(removeItem(id));
    };
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
    
                    let SHConvert = parseInt(SH) - ShowSettings.startHours;
                    let SMConvert = parseFloat(SM) / 60;
                    let EHConvert = parseInt(EH) - ShowSettings.startHours;
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
                        <div key={dayId + 'A'} data-item={pos[2].toString()} className="timeZonRow-child" style={{ position: "absolute", right: `${pos[0]}%`, width: `${pos[1]}%`,backgroundColor: `${getItemPlanColor(pos[2].toString())}50`}} onContextMenu={deleteItem}>
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
            if(i + ShowSettings.startHours > 24) {
                hoursTitle.push(i-24 + ShowSettings.startHours - 1 );  
            }
            else hoursTitle.push(i + ShowSettings.startHours - 1 );
        }
        return hoursTitle.map((title, index) => <div key={index + 'H'} className="hour-column-child text-center" style={{ width: `${100 / amount}%` }} dir="ltr">{lang === "Pr" ? toPersianNumber(title + ':00') :  title + ':00'} </div>)
    }
    return (
        <Fragment>
            <div className='modal-weeklyView w-100'>
            <div className="modal-weeklyView-body">
                <div className="week m-3  d-flex " style={{ position: "relative"}}>
                    <div className="days d-flex flex-column ">
                        <div className="day p-3 text-center" >#
                        </div>
                        {
                            days.map(day => <div key={day + 'HT'} className="day text-center">{convertDaytoString(day, lang)}</div>)
                        }
                    </div>
                    <div className="d-flex hour-column">
                        {
                            renderHouersForWeek(ShowSettings.totalHours)
                        }
                    </div>
                    <div className="d-flex flex-column timeZone ">
                        <div className="timeZonRow d-flex justify-content-center pt-3" style={{ position: "relative" }}>
                        {
                                renderHourTitle(ShowSettings.totalHours)
                        }
                        </div>
                        {
                            days.map(day => <div key={day+ 'AB'} className=" timeZonRow " style={{ position: "relative" }}>{renderPresentationPerTime(day, ShowSettings.totalHours)}</div>)
                        }
                    </div>
                </div>
            </div>
            </div>
            
            
        </Fragment>
    );
};

export default WeekTable; 