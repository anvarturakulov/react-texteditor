import React, {Component} from 'react';

import './font-family-list.css';
import Select from 'react-select';

export default class FontFamilyList extends Component {
    constructor(props) {
        super(props);
        this.onChangeFontType = this.onChangeFontType.bind(this);
    }

    onChangeFontType(e) {
        const {onChangeFontType} = this.props;
        const weightList = e.variants;
        onChangeFontType(e.name, weightList);
    }

    render() {
        const options = [];

        const load = async () => {
            const startFontList =  localStorage.getItem("fontlist");
            if (startFontList == null) {
                console.log('loading');
                const res = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBoZvaAD_fqwU2UWRvb6_ZFP-4NcLZaHdo');
                const saveData = await res.json();
                localStorage.setItem("fontlist", JSON.stringify(saveData));
                return saveData;
            } else {
                return await JSON.parse(startFontList);
            }
        }
    
        load().then(data => {
            data.items.forEach((element, key) => {
                options.push({name:element['family'],
                              value:element['family'],
                              label:element['family'],
                              variants : element['variants'],
                              id : key
                            });
            });
        });
        
        return (
            <Select 
                options={options}
                placeholder='Please select font type'
                onChange={(e) => this.onChangeFontType(e)}
            />
        )
    }
    
}
