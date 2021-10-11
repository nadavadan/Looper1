import React from "react";
import {Button} from 'antd';

export default class DrumPad extends React.Component {

    //Reload from props to state
    constructor(props) {
        super(props);
        this.state = {
            stateMode: props.stateMode,
            audio: props.audio,
            addToQue: props.addToQue,
            black: props.checked,
            playArray:props.playArray,
        }

    this.handleClick = this.handleClick.bind(this)
    }

    //Handel pad click = > change color and add to main map if dosnt exist, else - remove from main map
    handleClick(e){
        this.changeColor()
        this.state.addToQue(this.state.audio)
    }

    //Changing pad color when clicked.
    changeColor(){
        this.setState({black: !this.state.black})
    }
    //Render pad when button class depends on on\off pad state and changing css settings.
    render() {
        let btn_class = this.state.black ? "drum-pad1" : "drum-pad";
        btn_class= this.props.stateMode ? btn_class : "drum-pad";
        return (
            <div>
                <Button disabled = {!this.props.stateMode} className= {btn_class} onClick={this.handleClick} >
                </Button>
            </div>

        )
    }
}