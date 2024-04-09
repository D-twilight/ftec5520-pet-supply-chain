import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material//Home';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import GavelIcon from '@material-ui/icons/Gavel';
import './Supply.css';

function Supply() {
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
                med[i] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
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
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const handlerSubmitRMSsupply = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.RMSsupply(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitManufacturing = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Manufacturing(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitDistribute = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Distribute(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitRetail = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Retail(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitSold = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.sold(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    return (
        <div className='supply'>
            <div className='div-2'>
                <div className='user-table'>
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">Product's ID</th>
                                    <th scope="col">Product's Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Current Stage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(MED).map(function (key) {
                                    return (
                                    <tr key={key}>
                                        <td>{MED[key].id}</td>
                                        <td>{MED[key].name}</td>
                                        <td>{MED[key].description}</td>
                                        <td>{MedStage[key]}</td>
                                    </tr>
                                    )})}
                            </tbody>
                        </table>
                </div>
                <div className='text-wrapper-3'>Current Account Address: {currentaccount}</div>
                <Button onClick={redirect_to_home} className="home-button" variant="contained" startIcon={<HomeIcon />} color="success"> Home </Button>
                <div className='overlap'>
                    <p className='s'>Raw Materials Supplier</p>
                    <form onSubmit={handlerSubmitRMSsupply}>
                        <input className="rectangle" type="text" onChange={handlerChangeID} placeholder="Enter Product ID" required />
                        <Button variant="contained" startIcon={<ArtTrackIcon />} color="success" className="div-wrapper" onClick={handlerSubmitRMSsupply}>
                        Supply
                        </Button>
                    </form>
                </div>
                <div className='overlap-group'>
                    <p className='s'>Manufacturer</p>
                    <form onSubmit={handlerSubmitManufacturing}>
                        <input className="rectangle" type="text" onChange={handlerChangeID} placeholder="Enter Product ID" required />
                        <Button variant="contained" startIcon={<GavelIcon />} color="success" className="div-wrapper" onClick={handlerSubmitManufacturing}>
                        Manufacture
                        </Button>
                    </form>
                </div>
                <div className='overlap-2'>
                    <p className='s'>Distributor</p>
                    <form onSubmit={handlerSubmitDistribute}>
                        <input className="rectangle" type="text" onChange={handlerChangeID} placeholder="Enter Product ID" required />
                        <Button variant="contained" startIcon={<LocalShippingIcon />} color="success" className="div-wrapper" onClick={handlerSubmitDistribute}>
                            Distribute
                        </Button>
                    </form>
                </div>
                <div className='overlap-group-2'>
                    <p className='s'>Retailer</p>
                    <form onSubmit={handlerSubmitRetail}>
                        <input className="rectangle" type="text" onChange={handlerChangeID} placeholder="Enter Product ID" required />
                        <Button variant="contained" startIcon={<StorefrontIcon />} color="success" className="div-wrapper" onClick={handlerSubmitRetail}>
                            Retail
                        </Button>
                    </form>
                </div>
                <div className='overlap-3'>
                    <p className='s'>Sold (can only perform by retailers)</p>
                    <form onSubmit={handlerSubmitSold}>
                        <input className="rectangle" type="text" onChange={handlerChangeID} placeholder="Enter Product ID" required />
                        <Button variant="contained" startIcon={<AddShoppingCartIcon />} color="success" className="div-wrapper" onClick={handlerSubmitSold}>
                            Sold
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Supply
