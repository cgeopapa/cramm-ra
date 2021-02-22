import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import {Component} from "react";
import {Button} from 'primereact/button';
import {Link} from 'react-router-dom';
import FooterView from './FooterView';

export default class HomeView extends Component{
    render(){
        return (
            <div className="p-d-flex p-jc-between p-flex-column">
                <div className="p-d-flex p-jc-center">
                    <div className="p-d-flex p-flex-column p-ai-center" style={{width:"100%"}}>
                        <h1 className="p-text-normal">CRAMM Risk Assessment Tool</h1>
                        <div className="p-d-flex p-ai-center p-flex-column p-p-4 p-card" 
                        style={{backgroundColor: "#00f9", width:"100%"}}>
                            <h2 className="p-m-2 p-text-normal"
                            style={{color:"white"}}>Step 1: Asset Cartography</h2>
                            <Link to="/asset-cart">
                                <Button label="Map Assets" className="p-button-raised p-button-rounded"/>
                            </Link>
                        </div>
                        <div className="p-d-flex p-ai-center p-flex-column p-p-4 p-card" 
                        style={{backgroundColor: "#00fa", width:"100%"}}>
                            <h2 className="p-m-2 p-text-normal"
                            style={{color:"white"}}>Step 2: Impact Assessment</h2>
                            <Link to="/asset-eval">
                                <Button label="Evaluate Assets" className="p-button-raised p-button-rounded"/>
                            </Link>
                        </div>
                        <div className="p-d-flex p-ai-center p-flex-column p-p-4 p-card" 
                        style={{backgroundColor: "#00fb", width:"100%"}}>
                            <h2 className="p-m-2 p-text-normal"
                            style={{color:"white"}}>Step 3: Threat Assessment</h2>
                            <Link to="/threat-eval">
                                <Button label="Evaluate Threats" className="p-button-raised p-button-rounded"/>
                            </Link>
                        </div>
                        <div className="p-d-flex p-ai-center p-flex-column p-p-4 p-card" 
                        style={{backgroundColor: "#00fc", width:"100%"}}>
                            <h2 className="p-m-2 p-text-normal"
                            style={{color:"white"}}>Results Table</h2>
                            <Link to="/results">
                                <Button label="Show Results" className="p-button-raised p-button-rounded"/>
                            </Link>
                        </div>
                    </div>
                </div>
                <FooterView/>
            </div>
        );
    }
}