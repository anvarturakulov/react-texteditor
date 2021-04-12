import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import WebFont from'webfontloader';



const fontloader = (font)=> {
    // console.log(font);
    WebFont.load({google: {families: [`${font}`,`${font}`]}});
};

ReactDOM.render(<App fontloader = {fontloader}/> ,document.getElementById('root'));

