
import { useEffect, useState, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { toPersianNumber, generateTimeString } from '../../Helper/functions';
import WeekTable from '../table';
import ItemGenerator from '../UI/itemGenerator';

const Home = () => {

    return (
        <Fragment>
            <WeekTable />
            <ItemGenerator />
        </Fragment>
    );
};

export default Home; 