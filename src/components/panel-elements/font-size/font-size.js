import { render } from '@testing-library/react';
import React, {Component} from 'react';

import './font-size.css';

export default class FontSize extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: 10    
        }; 
        this.up= this.up.bind(this);
        this.down= this.down.bind(this);
        this.onChange= this.onChange.bind(this);
    }

    up() {
        this.setState({count: this.state.count + 1});
        const {onChangeFontSize} = this.props;
        onChangeFontSize(this.state.count+1);

      }
    down() {
        this.setState({count: this.state.count - 1});
        const {onChangeFontSize} = this.props;
        onChangeFontSize(this.state.count-1);
    }  

    onChange(e) {
        e.target.value = this.state.count
    }
          
    render() {
        const {count} = this.state
        return (
            <div className="counter">
                <div className='ico-big'><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M0 2H4V12H6V2H10V1V0H0V2Z" fill="#AAB2BB"/></svg></div>
                <div className='ico-mini'><svg width="5" height="6" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M0 2H4V12H6V2H10V1V0H0V2Z" fill="#AAB2BB"/></svg></div>
                <input type='text' value={count} onChange= {e => this.OnChange(e)} className='input-count'></input>
                <div className='btn-box'>
                    <button className='btnUp' onClick={() => this.up()}>
                        <div className='ico-plus'>+</div>                       
                    </button>
                    <button className='btnDown' onClick={() => this.down()}>
                        <div className='ico-minus' >-</div>
                    </button>
                </div>
            </div>   
        );
    }
}

