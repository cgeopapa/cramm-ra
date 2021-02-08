import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import {Component} from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';

export default class TopMenuView extends Component{
    private items = [
        {label: 'Asset Cartography', url: '/asset-cart'},
        {label: 'Asset Evaluation', url: '/asset-eval'},
        {label: 'Threat Evaluation', url: '/threat-eval'},
        {label: 'Results Tables', url: '/results'},
    ];
    private home = { icon: 'pi pi-home', url: '/' }

    render(){
        return (
            <div>
                <div className="card">
                    <BreadCrumb model={this.items} home={this.home} />
                </div>
            </div>
        );
    }
}