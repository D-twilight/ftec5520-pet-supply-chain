import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material//Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './AddMed.css';

function AddMed() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState();
    const [MedName, setMedName] = useState();
    const [MedDes, setMedDes] = useState();
    const [MedStage, setMedStage] = useState();


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
    const handlerChangeNameMED = (event) => {
        setMedName(event.target.value);
    }
    const handlerChangeDesMED = (event) => {
        setMedDes(event.target.value);
    }
    const handlerSubmitMED = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addMedicine(MedName, MedDes).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    return (
        <div className='add-med'>
            <div className='div-2'>
                <div className='user-table'>
                    <table className="table table-bordered">
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
                <div className='text-wrapper'>Order Details</div>
                <div className="add-order">
                    <form onSubmit={handlerSubmitMED}>
                        <input className="frame-1" type="text" onChange={handlerChangeNameMED} placeholder="Product's Name" required />
                        <input className="frame-2" type="text" onChange={handlerChangeDesMED} placeholder="Product's Description" required />
                        <Button variant="contained" startIcon={<ShoppingCartIcon />} color="success" className="order-button" onClick={handlerSubmitMED}>
                        Order
                        </Button>
                    </form>
                    <div className="text-wrapper-3">Add Your Order</div>
                </div>
                <div className="text-wrapper-4">Current Account Address: {currentaccount}</div>
                <Button onClick={redirect_to_home} className="home-button" variant="contained" startIcon={<HomeIcon />} color="success"> Home </Button>
            </div>
        </div>
    )
}

export default AddMed
