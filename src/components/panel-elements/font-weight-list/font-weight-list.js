import React, {Component} from 'react';

import './font-weight-list.css';
import Select from 'react-select';

export default class FontWeightList extends Component {
    constructor(props) {
        super(props);
        this.onChangeFontWeight = this.onChangeFontWeight.bind(this);
    }

    onChangeFontWeight(e) {
        const {onChangeFontWeight} = this.props;
        onChangeFontWeight(e.name);
    }

    render() {
        const {weightList} = this.props;
        return (
            <div className='weight-container'>
                <Select
                    options={weightList}
                    placeholder='...'
                    onChange={e => this.onChangeFontWeight(e)}
                />
            </div>
        )
    }
    
}
