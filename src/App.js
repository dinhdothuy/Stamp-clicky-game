import React, { Component } from 'react';
import './App.css';
import stamps from './stamps.json'
import Wrapper from './components/Wrapper'
import Navpills from './components/Navpills'
import Title from './components/Title'
import StampCard from './components/StampCard'

class App extends Component {
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        stamps: stamps,
        unselectedStamps: stamps
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectStamp = name => {
        const sameStamp = this.state.unselectedStamps.find(item => item.name === name);

        if(sameStamp === undefined) {
            // failure to select other stamp
            this.setState({ 
                message: "You guessed incorrectly!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                stamps: stamps,
                unselectedStamps: stamps
            });
        }
        else {
            // success to select different stamp
            const otherStamp = this.state.unselectedStamps.filter(item => item.name !== name);
            
            this.setState({ 
                message: "You guessed correctly!",
                curScore: this.state.curScore + 1,
                stamps: stamps,
                unselectedStamps: otherStamp
            });
        }

        this.shuffleArray(stamps);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.stamps.map(stamp => (
                        <StampCard
                            name={stamp.name}
                            image={stamp.image}
                            selectStamp={this.selectStamp} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;

