import React, {Component} from 'react';

import './app.css';
import EditorPage from '../editor-page';
import ProrertyPanel from '../prorerty-panel';

export default class App extends Component  {
    constructor(props){
        super(props);
        this.state = {
            idNewStyle : 'new123456',
            newStyleText : {
                fontSize: 60,
                fontWeight : 400,
                color: '#hhh',
                fontFamily: 'Abel',
                import: "url(//fonts.googleapis.com/css?family=Open+Sans)"
            },
        }
        this.applyNewStyle = this.applyNewStyle.bind(this);
        
    }

    applyNewStyle(idNewStyle, newStyleText) {
        this.setState({idNewStyle, newStyleText})
    }

    render() {
        return (
            <div className='app'>
                <EditorPage
                    idNewStyle = {this.state.idNewStyle}
                    newStyleText = {this.state.newStyleText}
                    startApplyStyle = {this.startApplyStyle}
                />
                <ProrertyPanel
                    applyNewStyle = {this.applyNewStyle}
                />
            </div>
        )
    }
}
