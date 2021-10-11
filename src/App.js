import './App.css';
import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import DrumPad from "./components/drumPad";
import SilentStar from "./Loops/SilentStar_120_Em_OrganSynth.mp3";
import PAS3GROOVE1 from "./Loops/PAS3GROOVE1.03B.mp3";
import MazePolitics from "./Loops/MazePolitics_120_Perc.mp3";
import StompySlosh from "./Loops/FUD_120_StompySlosh.mp3";
import electric_guitar from "./Loops/electric guitar coutry slide 120bpm - B.mp3";
import heavy_funk from "./Loops/Bass Warwick heavy funk groove on E 120 BPM.mp3";
import stutter from "./Loops/120_stutter_breakbeats_16.mp3";
import future_funk from "./Loops/120_future_funk_beats_25.mp3";
import tango from "./Loops/GrooveB_120bpm_Tanggu.mp3";
const sounds = [
    {
        key: 't',
        mp3: tango
    },
    {
        key: 'W',
        mp3: future_funk
    },
    {
        key: 'E',
        mp3: stutter
    },
    {
        key: 'A',
        mp3: heavy_funk
    },
    {
        key: 'S',
        mp3: electric_guitar
    },
    {
        key: 'D',
        mp3: StompySlosh
    },
    {
        key: 'Z',
        mp3: MazePolitics
    },
    {
        key: 'X',
        mp3: PAS3GROOVE1
    },
    {
        key: 'C',
        mp3: SilentStar
    },
];


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playArray: new Map(),
            stateMode: false,
            play:false,
            musicLoop: setInterval(undefined, undefined, undefined),
            song:"",
        };
        this.addToQue = this.addToQue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onStop = this.onStop.bind(this);
    }
    //Handle main state mode Switch. (On/Off)
    handleChange() {
        this.setState({
            stateMode:!this.state.stateMode,
        },()=>{
            this.onStop()
        })
    }

    //Play/Stop function will be using in forEach function when iterate main map.
    playIt = (value) => {
        console.log("In playIt",this.state.playArray)
        value.play()
    }
    stopIt = (value) => {
        console.log("In stopIt",this.state.playArray)
        value.pause();
    }

        onPlay() {
        console.log("on play",this.state.playArray)
        this.setState({
            play:true,
        },() => {
            //First loop until interval get start
            console.log("First loop")
            this.state.playArray.forEach(this.playIt)
            //Set interval in state for accessibility to clear it from other functions.
            this.setState({musicLoop: setInterval(() => {
                    const iterator1 = this.state.playArray[Symbol.iterator]();
                    for (const sound of iterator1) {
                        sound[1].play()
                    }
                    console.log("Loop")
                }, 8200)})
        })
    }

    onStop(src) {
        this.setState({
            play:false,
        },() => {
            //Clear main interval
            clearInterval(this.state.musicLoop)
            //Stop all active sounds
            this.state.playArray.forEach(this.stopIt)
        })
    }

    //Add sound to map if dosnt exist else - stop and remove it.
    addToQue(songUrl) {
        if (this.state.playArray.has(songUrl)) {
            this.state.playArray.get(songUrl).pause()
            this.state.playArray.delete(songUrl)
            console.log( "Sound removed",this.state.playArray)
        } else {
            this.state.playArray.set(songUrl,new Audio(songUrl))
            console.log("Sound added",this.state.playArray)
        }
    }

render() {
        return (
            <div id="display"   style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }} className="display">
                <div>
                    <Switch onChange={this.handleChange} checked={this.state.stateMode}/>
                    {/*Conditional rendering for css settings -> rendering on/off buttons */}
                    {this.state.stateMode
                        ? <div className="play">
                            <button disabled={this.state.play} onClick = {this.onPlay}> Play </button>
                            <button disabled={!this.state.play} onClick= {this.onStop}> Stop </button>
                        </div>
                        :""
                    }
                    <h1>Looper</h1>

                    {/*Conditional rendering for css settings. */}
                    {this.state.stateMode
                        ?                     <div className="display1" div>
                            {sounds.map((sound, idx) => (
                                <DrumPad stateMode = {this.state.stateMode}playArray = {this.state.playArray} addToQue={this.addToQue}  key={idx} audio={sound.mp3}/>
                            ))}
                        </div>
                        :                     <div className="display2" div>
                            {sounds.map((sound, idx) => (
                                <DrumPad stateMode = {this.state.stateMode}playArray = {this.state.playArray}  addToQue={this.addToQue}  key={idx} audio={sound.mp3}/>
                            ))}
                        </div>
                    }
                </div>

            </div>
        );
    }
}
export default App;
