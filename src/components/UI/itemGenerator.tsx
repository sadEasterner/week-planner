import './itemGenerator.css'
import { useEffect, useState, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

const ItemGenerator = () => {

    return (
        <Fragment>
            <section id="itemGeneator" className='mt-4'>
                <div className='row hide-Row'>
                    <div className='col-3'></div>
                    <div className='col-6'></div>
                    <div className='col-3'></div>
                </div>
            </section>
        </Fragment>
    );
};

export default ItemGenerator; 