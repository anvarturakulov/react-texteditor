import React, {Component} from 'react' ;
import chroma from 'chroma-js';
import Select from 'react-select';
import './text-color.css'

export default class TextColor extends Component {
    constructor(props) {
        super(props);
        this.onChangeFontColor = this.onChangeFontColor.bind(this);
    }

    onChangeFontColor(e) {
        const {onChangeFontColor} = this.props;
        onChangeFontColor(e.color);
    }

    render() {
        const colourOptions = [
            { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
            { value: 'blue', label: 'Blue', color: '#0052CC' },
            { value: 'purple', label: 'Purple', color: '#5243AA' },
            { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
            { value: 'orange', label: 'Orange', color: '#FF8B00' },
            { value: 'yellow', label: 'Yellow', color: '#FFC400' },
            { value: 'green', label: 'Green', color: '#36B37E' },
            { value: 'forest', label: 'Forest', color: '#00875A' },
            { value: 'slate', label: 'Slate', color: '#253858' },
            { value: 'silver', label: 'Silver', color: '#666666' },
          ];
        
        const dot = (color = '#ccc') => ({
          alignItems: 'center',
          display: 'flex',
        
          ':before': {
            backgroundColor: color,
            borderRadius: 0,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 15,
            width: 15,
          },
        });
        
        const colourStyles = {
          control: styles => ({ ...styles, backgroundColor: 'white' }),
          option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
              ...styles,
              backgroundColor: isDisabled
                ? null
                : isSelected
                ? data.color
                : isFocused
                ? color.alpha(0.1).css()
                : null,
              color: isDisabled
                ? '#ccc'
                : isSelected
                ? chroma.contrast(color, 'white') > 2
                  ? 'white'
                  : 'black'
                : data.color,
              cursor: isDisabled ? 'not-allowed' : 'default',
        
              ':active': {
                ...styles[':active'],
                backgroundColor:
                  !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
              },
            };
          },
          input: styles => ({ ...styles, ...dot() }),
          placeholder: styles => ({ ...styles, ...dot() }),
          singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
        };

        return(
            <div className='color-picker'>
                <Select
                    defaultValue={colourOptions[0]}
                    label="Single select"
                    options={colourOptions}
                    styles={colourStyles}
                    onChange={(e) => this.onChangeFontColor(e)}
                />
            </div>
            
        )
    }

} 
