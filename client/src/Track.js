import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './Track.css';

function Track() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState();
    const [MedStage, setMedStage] = useState();
    const [ID, setID] = useState();
    const [RMS, setRMS] = useState();
    const [MAN, setMAN] = useState();
    const [DIS, setDIS] = useState();
    const [RET, setRET] = useState();
    const [TrackTillSold, showTrackTillSold] = useState(false);
    const [TrackTillRetail, showTrackTillRetail] = useState(false);
    const [TrackTillDistribution, showTrackTillDistribution] = useState(false);
    const [TrackTillManufacture, showTrackTillManufacture] = useState(false);
    const [TrackTillRMS, showTrackTillRMS] = useState(false);
    const [TrackTillOrdered, showTrackTillOrdered] = useState(false);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };
    const loadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);
            var i;
            const medCtr = await supplychain.methods.medicineCtr().call();
            const med = {};
            const medStage = [];
            for (i = 0; i < medCtr; i++) {
                med[i + 1] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i + 1] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
            const rmsCtr = await supplychain.methods.rmsCtr().call();
            const rms = {};
            for (i = 0; i < rmsCtr; i++) {
                rms[i + 1] = await supplychain.methods.RMS(i + 1).call();
            }
            setRMS(rms);
            const manCtr = await supplychain.methods.manCtr().call();
            const man = {};
            for (i = 0; i < manCtr; i++) {
                man[i + 1] = await supplychain.methods.MAN(i + 1).call();
            }
            setMAN(man);
            const disCtr = await supplychain.methods.disCtr().call();
            const dis = {};
            for (i = 0; i < disCtr; i++) {
                dis[i + 1] = await supplychain.methods.DIS(i + 1).call();
            }
            setDIS(dis);
            const retCtr = await supplychain.methods.retCtr().call();
            const ret = {};
            for (i = 0; i < retCtr; i++) {
                ret[i + 1] = await supplychain.methods.RET(i + 1).call();
            }
            setRET(ret);
            setloader(false);
        }
        else {
            window.alert('The smart contract is not deployed to current network')
        }
    }
    if (loader) {
        return (
            <div>
                <h1 className="wait">Loading...</h1>
            </div>
        )
    }
    if (TrackTillSold) {
        return (
            <div className='track2'>
                <div className='div3'>
                    <div className='distributor'>
                        <div className='t1'>Distributor Details</div>
                        <div className='t2'>Distributor ID</div>
                        <div className='t3'>{DIS[MED[ID].DISid].id}</div>
                        <div className='t4'>{DIS[MED[ID].DISid].name}</div>
                        <div className='t5'>{DIS[MED[ID].DISid].place}</div>
                        <div className='t6'>Distributor Name</div>
                        <div className='t7'>Distributor Location</div>
                    </div>
                    <div className='manufacturer'>
                        <div className='t8'>Manufacturer Details</div>
                        <div className='t9'>Manufacturer ID</div>
                        <div className='t10'>{MAN[MED[ID].MANid].id}</div>
                        <div className='t11'>{MAN[MED[ID].MANid].name}</div>
                        <div className='t12'>{MAN[MED[ID].MANid].place}</div>
                        <div className='t13'>Manufacturer Name</div>
                        <div className='t14'>Manufacturer Location</div>
                    </div>
                    <div className='supplier'>
                        <div className='t15'>Supplier Details</div>
                        <div className='t16'>Supplier ID</div>
                        <div className='t17'>{RMS[MED[ID].RMSid].id}</div>
                        <div className='t18'>{RMS[MED[ID].RMSid].name}</div>
                        <div className='t19'>{RMS[MED[ID].RMSid].place}</div>
                        <div className='t20'>Supplier Name</div>
                        <div className='t21'>Supplier Location</div>
                    </div>
                    <div className='retailer'>
                        <div className='t1'>Retailer Details</div>
                        <div className='t2'>Retailer ID</div>
                        <div className='t3'>{RET[MED[ID].RETid].id}</div>
                        <div className='t4'>{RET[MED[ID].RETid].name}</div>
                        <div className='t5'>{RET[MED[ID].RETid].place}</div>
                        <div className='t6'>Retailer Name</div>
                        <div className='t7'>Retailer Location</div>
                    </div>
                    <div className='product'>
                        <div className='t22'>Product Details</div>
                        <div className='t23'>{MED[ID].id}</div>
                        <div className='t24'>{MED[ID].name}</div>
                        <div className='t25'>{MED[ID].description}</div>
                        <div className='t26'>{MedStage[ID]}</div>
                        <div className='t27'>Product ID</div>
                        <div className='t28'>Product Name</div>
                        <div className='t29'>Description</div>
                        <div className='t30'>Current Stage</div>
                    </div>
                    <Button size='large' variant="contained" startIcon={<ArrowBackIcon />} color="success" onClick={() => {
                        showTrackTillSold(false);
                    }} className="track2-back">Track Another Item</Button>
                    <Button size='large' variant="contained" startIcon={<HomeIcon />} color="success" className='track2-home' onClick={() => {
                        history.push('/')
                    }}> Home </Button>
                </div>
            </div>  
        )
    }
    if (TrackTillRetail) {
        return (
            <div className='track2'>
                <div className='div3'>
                    <div className='distributor'>
                        <div className='t1'>Distributor Details</div>
                        <div className='t2'>Distributor ID</div>
                        <div className='t3'>{DIS[MED[ID].DISid].id}</div>
                        <div className='t4'>{DIS[MED[ID].DISid].name}</div>
                        <div className='t5'>{DIS[MED[ID].DISid].place}</div>
                        <div className='t6'>Distributor Name</div>
                        <div className='t7'>Distributor Location</div>
                    </div>
                    <div className='manufacturer'>
                        <div className='t8'>Manufacturer Details</div>
                        <div className='t9'>Manufacturer ID</div>
                        <div className='t10'>{MAN[MED[ID].MANid].id}</div>
                        <div className='t11'>{MAN[MED[ID].MANid].name}</div>
                        <div className='t12'>{MAN[MED[ID].MANid].place}</div>
                        <div className='t13'>Manufacturer Name</div>
                        <div className='t14'>Manufacturer Location</div>
                    </div>
                    <div className='supplier'>
                        <div className='t15'>Supplier Details</div>
                        <div className='t16'>Supplier ID</div>
                        <div className='t17'>{RMS[MED[ID].RMSid].id}</div>
                        <div className='t18'>{RMS[MED[ID].RMSid].name}</div>
                        <div className='t19'>{RMS[MED[ID].RMSid].place}</div>
                        <div className='t20'>Supplier Name</div>
                        <div className='t21'>Supplier Location</div>
                    </div>
                    <div className='retailer'>
                        <div className='t1'>Retailer Details</div>
                        <div className='t2'>Retailer ID</div>
                        <div className='t3'>{RET[MED[ID].RETid].id}</div>
                        <div className='t4'>{RET[MED[ID].RETid].name}</div>
                        <div className='t5'>{RET[MED[ID].RETid].place}</div>
                        <div className='t6'>Retailer Name</div>
                        <div className='t7'>Retailer Location</div>
                    </div>
                    <div className='product'>
                        <div className='t22'>Product Details</div>
                        <div className='t23'>{MED[ID].id}</div>
                        <div className='t24'>{MED[ID].name}</div>
                        <div className='t25'>{MED[ID].description}</div>
                        <div className='t26'>{MedStage[ID]}</div>
                        <div className='t27'>Product ID</div>
                        <div className='t28'>Product Name</div>
                        <div className='t29'>Description</div>
                        <div className='t30'>Current Stage</div>
                    </div>
                    <Button size='large' variant="contained" startIcon={<ArrowBackIcon />} color="success" onClick={() => {
                        showTrackTillRetail(false);
                    }} className="track2-back">Track Another Item</Button>
                    <Button size='large' variant="contained" startIcon={<HomeIcon />} color="success" className='track2-home' onClick={() => {
                        history.push('/')
                    }}> Home </Button>
                </div>
            </div>  
        )
    }
    if (TrackTillDistribution) {
        return (
            <div className='track2'>
                <div className='div3'>
                    <div className='distributor'>
                        <div className='t1'>Distributor Details</div>
                        <div className='t2'>Distributor ID</div>
                        <div className='t3'>{DIS[MED[ID].DISid].id}</div>
                        <div className='t4'>{DIS[MED[ID].DISid].name}</div>
                        <div className='t5'>{DIS[MED[ID].DISid].place}</div>
                        <div className='t6'>Distributor Name</div>
                        <div className='t7'>Distributor Location</div>
                    </div>
                    <div className='manufacturer'>
                        <div className='t8'>Manufacturer Details</div>
                        <div className='t9'>Manufacturer ID</div>
                        <div className='t10'>{MAN[MED[ID].MANid].id}</div>
                        <div className='t11'>{MAN[MED[ID].MANid].name}</div>
                        <div className='t12'>{MAN[MED[ID].MANid].place}</div>
                        <div className='t13'>Manufacturer Name</div>
                        <div className='t14'>Manufacturer Location</div>
                    </div>
                    <div className='supplier'>
                        <div className='t15'>Supplier Details</div>
                        <div className='t16'>Supplier ID</div>
                        <div className='t17'>{RMS[MED[ID].RMSid].id}</div>
                        <div className='t18'>{RMS[MED[ID].RMSid].name}</div>
                        <div className='t19'>{RMS[MED[ID].RMSid].place}</div>
                        <div className='t20'>Supplier Name</div>
                        <div className='t21'>Supplier Location</div>
                    </div>
                    <div className='product'>
                        <div className='t22'>Product Details</div>
                        <div className='t23'>{MED[ID].id}</div>
                        <div className='t24'>{MED[ID].name}</div>
                        <div className='t25'>{MED[ID].description}</div>
                        <div className='t26'>{MedStage[ID]}</div>
                        <div className='t27'>Product ID</div>
                        <div className='t28'>Product Name</div>
                        <div className='t29'>Description</div>
                        <div className='t30'>Current Stage</div>
                    </div>
                    <Button size='large' variant="contained" startIcon={<ArrowBackIcon />} color="success" onClick={() => {
                        showTrackTillDistribution(false);
                    }} className="track2-back">Track Another Item</Button>
                    <Button size='large' variant="contained" startIcon={<HomeIcon />} color="success" className='track2-home' onClick={() => {
                        history.push('/')
                    }}> Home </Button>
                </div>
            </div>  
        )
    }
    if (TrackTillManufacture) {
        return (
            <div className='track2'>
                <div className='div3'>
                    <div className='manufacturer'>
                        <div className='t8'>Manufacturer Details</div>
                        <div className='t9'>Manufacturer ID</div>
                        <div className='t10'>{MAN[MED[ID].MANid].id}</div>
                        <div className='t11'>{MAN[MED[ID].MANid].name}</div>
                        <div className='t12'>{MAN[MED[ID].MANid].place}</div>
                        <div className='t13'>Manufacturer Name</div>
                        <div className='t14'>Manufacturer Location</div>
                    </div>
                    <div className='supplier'>
                        <div className='t15'>Supplier Details</div>
                        <div className='t16'>Supplier ID</div>
                        <div className='t17'>{RMS[MED[ID].RMSid].id}</div>
                        <div className='t18'>{RMS[MED[ID].RMSid].name}</div>
                        <div className='t19'>{RMS[MED[ID].RMSid].place}</div>
                        <div className='t20'>Supplier Name</div>
                        <div className='t21'>Supplier Location</div>
                    </div>
                    <div className='product'>
                        <div className='t22'>Product Details</div>
                        <div className='t23'>{MED[ID].id}</div>
                        <div className='t24'>{MED[ID].name}</div>
                        <div className='t25'>{MED[ID].description}</div>
                        <div className='t26'>{MedStage[ID]}</div>
                        <div className='t27'>Product ID</div>
                        <div className='t28'>Product Name</div>
                        <div className='t29'>Description</div>
                        <div className='t30'>Current Stage</div>
                    </div>
                    <Button size='large' variant="contained" startIcon={<ArrowBackIcon />} color="success" onClick={() => {
                        showTrackTillManufacture(false);
                    }} className="track2-back">Track Another Item</Button>
                    <Button size='large' variant="contained" startIcon={<HomeIcon />} color="success" className='track2-home' onClick={() => {
                        history.push('/')
                    }}> Home </Button>
                </div>
            </div>  
        )
    }
    if (TrackTillRMS) {
        return (
            <div className='track2'>
                <div className='div3'>
                    <div className='supplier'>
                        <div className='t15'>Supplier Details</div>
                        <div className='t16'>Supplier ID</div>
                        <div className='t17'>{RMS[MED[ID].RMSid].id}</div>
                        <div className='t18'>{RMS[MED[ID].RMSid].name}</div>
                        <div className='t19'>{RMS[MED[ID].RMSid].place}</div>
                        <div className='t20'>Supplier Name</div>
                        <div className='t21'>Supplier Location</div>
                    </div>
                    <div className='product'>
                        <div className='t22'>Product Details</div>
                        <div className='t23'>{MED[ID].id}</div>
                        <div className='t24'>{MED[ID].name}</div>
                        <div className='t25'>{MED[ID].description}</div>
                        <div className='t26'>{MedStage[ID]}</div>
                        <div className='t27'>Product ID</div>
                        <div className='t28'>Product Name</div>
                        <div className='t29'>Description</div>
                        <div className='t30'>Current Stage</div>
                    </div>

                    <Button size='large' variant="contained" startIcon={<ArrowBackIcon />} color="success" onClick={() => {
                        showTrackTillRMS(false);
                    }} className="track2-back">Track Another Item</Button>
                    <Button size='large' variant="contained" startIcon={<HomeIcon />} color="success" className='track2-home' onClick={() => {
                        history.push('/')
                    }}> Home </Button>
                </div>
            </div>  
        )
    }
    if (TrackTillOrdered) {
        return (
            <div className='track2'>
                <div className='div3'>
                    <div className='product'>
                        <div className='t22'>Product Details</div>
                        <div className='t23'>{MED[ID].id}</div>
                        <div className='t24'>{MED[ID].name}</div>
                        <div className='t25'>{MED[ID].description}</div>
                        <div className='t26'>{MedStage[ID]}</div>
                        <div className='t27'>Product ID</div>
                        <div className='t28'>Product Name</div>
                        <div className='t29'>Description</div>
                        <div className='t30'>Current Stage</div>
                    </div>
                    <div className='supplier'>
                        <div className='t15'>Order Not Yet Processed. Thank you for your inquiry.</div>
                    </div>
                    <Button size='large' variant="contained" startIcon={<ArrowBackIcon />} color="success" onClick={() => {
                        showTrackTillOrdered(false);
                    }} className="track2-back">Track Another Item</Button>
                    <Button size='large' variant="contained" startIcon={<HomeIcon />} color="success" className='track2-home' onClick={() => {
                        history.push('/')
                    }}> Home </Button>
                </div>
            </div>  
        )
    }
    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerSubmit = async (event) => {
        event.preventDefault();
        var ctr = await SupplyChain.methods.medicineCtr().call();
        if (!((ID > 0) && (ID <= ctr)))
            alert("Invalid Medicine ID!!!");
        else {
            // eslint-disable-next-line
            if (MED[ID].stage == 5)
                showTrackTillSold(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 4)
                showTrackTillRetail(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 3)
                showTrackTillDistribution(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 2)
                showTrackTillManufacture(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 1)
                showTrackTillRMS(true);
            else
                showTrackTillOrdered(true);

        }
    }

    return (
        <div>
            <span className="account"><b>Current Account Address:</b> {currentaccount}</span>
            <Button onClick={redirect_to_home} variant="contained" startIcon={<HomeIcon />} color="success" className='home-button'> Home </Button>
            <div className="track">
                <p className="title">Enter Order ID to Track it</p>
                <form onSubmit={handlerSubmit}>
                    <input className="input" type="text" onChange={handlerChangeID} placeholder="Enter Order ID" required />
                    <Button variant="contained" startIcon={<ArtTrackIcon />} color="success" className="button" onClick={handlerSubmit}>Track</Button>
                </form> 
            </div>
            <div className="table">
                <table className="table table-sm table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Order ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Current Processing Stage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(MED).map(function (key) {
                            return (
                                <tr key={key}>
                                    <td>{MED[key].id}</td>
                                    <td>{MED[key].name}</td>
                                    <td>{MED[key].description}</td>
                                    <td>
                                        {
                                            MedStage[key]
                                        }
                                    </td>
                                </tr>
                            )   
                        })}
                    </tbody>
                </table>
            </div>           
        </div>
    )
}

export default Track
