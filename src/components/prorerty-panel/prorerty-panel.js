import React, {Component} from 'react';
import './prorerty-panel.css';
import TextColor from '../panel-elements/text-color';
import FontFamilyList from '../panel-elements/font-family-list';
import FontWeightList from '../panel-elements/font-weight-list';
import FontSize from '../panel-elements/font-size'


export default class ProrertyPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontType : '',
            fontWeight : '',
            fontColor : '#00B8D9',
            weightList: [],
            fontSize : 10
        }
        this.onChangeFontType = this.onChangeFontType.bind(this);
        this.applyFontStyle = this.applyFontStyle.bind(this);
        this.onChangeFontColor = this.onChangeFontColor.bind(this);
        this.onChangeFontWeight = this.onChangeFontWeight.bind(this);
        this.onChangeFontSize = this.onChangeFontSize.bind(this);
    }

    onChangeFontType(fontType,weightList) {
        this.setState({ fontType });
        const newWeightList = weightList.map(item => {
            return {name:item, value:item, label:item}
        })
        this.setState({ weightList : []});
        this.setState({ weightList : newWeightList});
    }

    applyFontStyle() {
        const {fontType,fontWeight,fontColor,fontSize} = this.state;
        const fontTypeStr = fontType.replace(/\s/g, '');
        const idNewStyle = `${fontTypeStr}-${fontWeight}-${fontColor}-${fontSize}`;
        const newStyleText = {
            fontSize: fontSize,
            fontWeight : fontWeight,
            color: fontColor,
            fontFamily: fontType,
            import: "url(//fonts.googleapis.com/css?family=Open+Sans)"
        }
        const {applyNewStyle} = this.props;
        applyNewStyle(idNewStyle, newStyleText);
    }

    onChangeFontColor(fontColor) {
        this.setState({ fontColor });
    }

    onChangeFontWeight(fontWeight) {
        this.setState({ fontWeight });
    }

    onChangeFontSize(fontSize) {
        this.setState({ fontSize });
    }

    render() {
     
        return(
            <div className='prorerty-panel'>
                <div className='panel-caption'>Text</div>
                <div>
                    <FontFamilyList
                        onChangeFontType= {this.onChangeFontType}
                    />
                    <div className='weight_size-box'>
                        <FontWeightList 
                            weightList = {this.state.weightList}
                            onChangeFontWeight = {this.onChangeFontWeight}
                        />
                        <FontSize
                            onChangeFontSize = {this.onChangeFontSize}
                        />
                    </div>
                    
                    <TextColor
                        onChangeFontColor = {this.onChangeFontColor}
                    />
                </div>
                <button 
                    className='btn-save'
                    onClick = {this.applyFontStyle}
                    >Save Changes</button>
            </div>
        )
    }
    
}
