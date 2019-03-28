import React, { Component } from 'react';
import clickHigh from '../../assets/high.wav';
import clickLow from '../../assets/low.wav';

let tapArray = [];
class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      beatCount: true,
      bpm: 100,
      beatsPerMeasure: 4
    };

    this.clickHigh = new Audio(clickHigh);
    this.clickLow = new Audio(clickLow);
  }

  startStop = () => {
    if (this.state.isPlaying) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState({
        isPlaying: false
      });
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState(
        {
          beatCount: 0,
          isPlaying: true
          // Play a click "immediately" (after setState finishes)
        },
        this.playClick
      );
    }
  };

  playClick = () => {
    if (this.state.beatCount) {
      this.clickHigh.play();
    } else {
      this.clickLow.play();
    }
    this.setState(prevState => ({
      beatCount: !prevState.beatCount
    }));
  };

  handleBpmChange = event => {
    console.log(event);
    const bpm = event.target.value;
    if (this.state.isPlaying) {
      // Stop the old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // Set the new BPM, and reset the beat beatCounter
      this.setState({
        beatCount: 0,
        bpm
      });
    } else {
      // Otherwise just update the BPM
      this.setState({ bpm });
    }
  };

  tapTempo = event => {
    let bpm;
    tapArray.push(new Date().getTime());
    console.log(tapArray.length, tapArray);
    if (tapArray.length == 3) {
      tapArray.shift();
      console.log('removed', tapArray);
      bpm = tapArray[1] - tapArray[0];
      bpm = bpm / 1000;
      bpm = 60 / bpm;
      bpm = Math.floor(bpm);
      console.log('bpm:', bpm);
    } else if (tapArray.length == 2) {
      bpm = tapArray[1] - tapArray[0];
      bpm = bpm / 1000;
      bpm = 60 / bpm;
      bpm = Math.floor(bpm);
      console.log('bpm:', bpm);
    }

    // eslint-disable-next-line default-case
    if (bpm < 40) {
      bpm = 40;
    }
    if (bpm > 240) {
      bpm = 240;
    }
    var x = document.getElementById('slide');
    x.value = bpm;

    if (bpm) {
      if (this.state.isPlaying) {
        // Stop the old timer and start a new one
        clearInterval(this.timer);
        this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

        // Set the new BPM, and reset the beat beatCounter
        this.setState({
          beatCount: 0,
          bpm
        });
      } else {
        // Otherwise just update the BPM
        this.setState({ bpm });
      }
    }
  };

  render() {
    const { isPlaying, bpm } = this.state;

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            id="slide"
            type="range"
            onClick={this.handleBpmChange}
            min="60"
            max="240"
            defaultValue={bpm}
          />
        </div>
        <button onClick={this.tapTempo}>Tap</button>
        <button onClick={this.startStop}>{isPlaying ? 'Stop' : 'Start'}</button>
      </div>
    );
  }
}

export default Metronome;
