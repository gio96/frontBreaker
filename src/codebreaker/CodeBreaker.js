import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

class CodeBreaker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        startMessage: '',
        resultMessage: ''
    };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }

  
    goToPlay = () =>{
      
        let randomValue = generateRandomNumber();
        axios.get(`http://localhost:4200/setsecret/${randomValue}`).then(res =>{
            console.log("El numero adivinar " + randomValue);
            this.setState({startMessage : res.data.message});
      })
    }
  
    handleSubmit(event) {
       axios.get(`http://localhost:4200/guess/${this.state.value}`).then(res =>{
        this.setState({resultMessage : res.data.result});
      })
      event.preventDefault();    
    }

 
    render() {
      return (
          <div>
            <h1>Code Breaker</h1>
            <div>
              <input id="startButton" type = "button" value="Random Number" onClick={this.goToPlay} /> 
            </div>
            <form onSubmit={this.handleSubmit}>
            <label>
              Guess Number : 
              <input id="textNumber" type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
              <input id="buttonGuess" type="submit" value="Guess" />
            </form>
            <div>
              <p>{this.state.startMessage}</p>
              <p>{this.state.resultMessage}</p>
            </div>
          </div>        
      );
    }
  }

  function generateRandomNumber(){
    var MAX = 3;
    var drawNum  = [];
    var randomNumber= "";
    for(let i = 0; i <= MAX; i++){
      drawNum[i] = Math.floor(Math.random()*(1+8)+1);
    }
    for(let i = 0; i <= MAX; i++){
      while ( (drawNum[0] === drawNum[1]) ||
              (drawNum[0] === drawNum[2]) ||
              (drawNum[0] === drawNum[3]) )
      {
          drawNum[0] = Math.floor(Math.random()*(1+8)+1);
      }

      while ( (drawNum[1] === drawNum[0]) ||
              (drawNum[1] === drawNum[2]) ||
              (drawNum[1] === drawNum[3]) )
      {
          drawNum[1] = Math.floor(Math.random()*(1+8)+1);;
      }

      while ( (drawNum[2] === drawNum[0]) ||
              (drawNum[2] === drawNum[1]) ||
              (drawNum[2] === drawNum[3]) )
      {
          drawNum[2] = Math.floor(Math.random()*(1+8)+1);;
      }

      while ( (drawNum[3] === drawNum[0]) ||
              (drawNum[3] === drawNum[1]) ||
              (drawNum[3] === drawNum[2]) )
      {
          drawNum[3] = Math.floor(Math.random()*(1+8)+1);;
      }

      }
      for (let x = 0; x <= 3; x++){
        randomNumber = randomNumber + drawNum[x];
        console.log(randomNumber);
     }
      return parseInt(randomNumber);
  }

  export default CodeBreaker;