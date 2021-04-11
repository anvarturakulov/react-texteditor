import React, {Component} from 'react';

import {Editor, EditorState, RichUtils, getDefaultKeyBinding,convertToRaw,convertFromRaw} from 'draft-js'

import './editor-page.css';
import './draft-js.css';

export default class EditorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
          startApplyStyle : 0
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {
          const raw = convertToRaw(editorState.getCurrentContent());
          this.saveEditorContent(raw);
          this.setState({editorState})
        };
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.newStyle = this.newStyle.bind(this);
        this.loadStyleMap = this.loadStyleMap.bind(this);
        this.saveStyleMap = this.saveStyleMap.bind(this);
    }

      _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return true;
        }
        return false;
      }

      _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) { 
          const newEditorState = RichUtils.onTab(e,this.state.editorState,4, /* maxDepth */);
          if (newEditorState !== this.state.editorState) {
            this.onChange(newEditorState);
          }
          return;
        }
        return getDefaultKeyBinding(e);
      }

      saveEditorContent(data) {
        localStorage.setItem("editorData", JSON.stringify(data));
      }
    
      getSavedEditorData() {
        const startData = {"blocks":[{"key":"3clki","text":"Elizabeth Raffald (1733–1781) was an English author, innovator and entrepreneur. Born and raised in Doncaster, Yorkshire, Raffald went into domestic service for fifteen years, ending as the housekeeper to the Warburton baronets at Arley Hall, Cheshire. She moved with her husband to Manchester, where she opened a register office to introduce domestic workers to employers; she also ran a cookery school and sold food from the premises. In 1769 she published her cookery book The Experienced English Housekeeper, which contains the first recipe for a \"Bride Cake\" that is recognisable as a modern wedding cake. She is possibly the inventor of the Eccles cake. In August 1772 Raffald published The Manchester Directory, a listing of 1,505 traders and civic leaders in Manchester—the first such listing for the up-and-coming town. Her recipes were plagiarised by other authors, notably by Isabella Beeton in her bestselling Mrs Beeton's Book of Household Management (1861).","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":449,"length":21,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"caure","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}};
        const savedData = localStorage.getItem("editorData");
        return savedData ? JSON.parse(savedData) : startData;
      }

      componentDidMount() {
        const rawEditorData = this.getSavedEditorData();
        if (rawEditorData !== null) {
          const contentState = convertFromRaw(rawEditorData);
          this.setState({
            editorState: EditorState.createWithContent(contentState),
          });
        }
      }

      newStyle() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState,this.props.idNewStyle));
      }

      loadStyleMap() {
        const startStyleMap =  localStorage.getItem("styleMap");
        return startStyleMap ? JSON.parse(startStyleMap) : {};
        
      }

      saveStyleMap(data) {
          localStorage.setItem("styleMap", JSON.stringify(data));
      }

      componentDidUpdate(prevProps) {
        if (this.props.idNewStyle !== prevProps.idNewStyle) {
            this.onChange(RichUtils.toggleInlineStyle(this.state.editorState,this.props.idNewStyle));
        }
    }


      render() {
        const {editorState} = this.state;
        let className = 'RichEditor-editor';

        const {idNewStyle, newStyleText} = this.props;
        
        const styleMapStart = this.loadStyleMap();
        const styleMap = Object.assign(styleMapStart, {[idNewStyle]: newStyleText});

        this.saveStyleMap(styleMap);

          // this.onChange(RichUtils.toggleInlineStyle(this.state.editorState,this.props.idNewStyle));
        
        return (
          <div className="RichEditor-root">

            <div className={className} onClick={this.focus}>
              <Editor
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                keyBindingFn={this.mapKeyToEditorCommand}
                onChange={this.onChange}
                placeholder="..."
                ref="editor"
              />
            </div>
            {/* <button onClick = {this.newStyle}>Новый стил </button> */}
          </div>
        );
      }
    }
