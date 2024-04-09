import React from 'react'
import { useHistory } from "react-router-dom"
import './Home.css';
import pic from './image/homepic.png';
import logo from './image/logo.jpg';
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddIcon from '@mui/icons-material/Add';
import BallotIcon from '@mui/icons-material/Ballot';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';

function Home() {
    const history = useHistory()
    const redirect_to_roles = () => {
        history.push('/roles')
    }
    const redirect_to_addmed = () => {
        history.push('/addmed')
    }
    const redirect_to_supply = () => {
        history.push('/supply')
    }
    const redirect_to_track = () => {
        history.push('/track')
    }
    return (
        <div style={{ backgroundImage: `url(${pic})` }}>
            <img src={logo} className="logo" /> 
            <div className='home'>
                <div className='overlap-group-wrapper'>
                    <div className='overlap-group'>
                    
                    
                            <Button variant="contained" startIcon={<AddIcon />} color="success" onClick={redirect_to_addmed} className="text-wrapper-3">Add Order</Button>
                            <Button variant="contained" startIcon={<BallotIcon />} color="success" onClick={redirect_to_supply} className="div">Supply Chain</Button>
                            <Button variant="contained" startIcon={<ArtTrackIcon />} color="success" onClick={redirect_to_track} className="text-wrapper">Track Order</Button>
                            
                            <Button size='large' style= { { width: 381, height: 86 }} variant="contained" startIcon={<AccountBoxIcon /> } color="success" onClick={redirect_to_roles} className="register-button">
                                <div className='text-wrapper-2'>Start Your Journey</div>
                            </Button>
                            
                            <p className='p'>Intelligent Pet Food Traceability System</p>
                            <div className='frame'>
                                <div className='text-wrapper-4'>ABOUT US</div>
                                <div className='about'>Pet Food Traceability System Demo 3.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Designed from <b>FTEC 5520 Group 5</b></div>
                            </div>
                               
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
