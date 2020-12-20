import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { Component } from "react";
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export default class HomeView extends Component{
    render(){
        return (
            <div className="p-d-flex p-jc-center">
                <div className="p-d-flex p-flex-column p-ai-center" style={{width:"100%"}}>
                    <h1 className="p-text-normal">CRAMM Risk Assessment Tool</h1>
                    <div className="p-d-flex p-ai-center p-flex-column p-p-4" 
                    style={{backgroundColor: "#00f9", width:"100%"}}>
                        <h2 className="p-m-2 p-text-normal"
                        style={{color:"white"}}>Step 1: Asset Cartography</h2>
                        <Link to="/asset-cart">
                            <Button label="Asset Chartography" className="p-button-raised p-button-rounded"/>
                        </Link>
                    </div>
                    <div className="p-d-flex p-ai-center p-flex-column p-p-4" 
                    style={{backgroundColor: "#00fa", width:"100%"}}>
                        <h2 className="p-m-2 p-text-normal"
                        style={{color:"white"}}>Step 2: Asset Evaluation</h2>
                        <Button label="Under Construction..." disabled className="p-button-raised p-button-rounded"/>
                    </div>
                    <div className="p-d-flex p-ai-center p-flex-column p-p-4" 
                    style={{backgroundColor: "#00fb", width:"100%"}}>
                        <h2 className="p-m-2 p-text-normal"
                        style={{color:"white"}}>Step 3: Threat Evaluation</h2>
                        <Button label="Under Construction..." disabled className="p-button-raised p-button-rounded"/>
                    </div>
                    <div className="p-d-flex p-ai-center p-flex-column p-p-4" 
                    style={{backgroundColor: "#00fc", width:"100%"}}>
                        <h2 className="p-m-2 p-text-normal"
                        style={{color:"white"}}>Results Table</h2>
                        <Button label="Under Construction..." disabled className="p-button-raised p-button-rounded"/>
                    </div>
                </div>
            </div>
        );
    }
}