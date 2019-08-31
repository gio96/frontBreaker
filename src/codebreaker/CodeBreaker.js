import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

class CodeBreaker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }

    goToPlay = () =>{
        let randomValue = Math.floor(Math.random() * (9999 - 1000)) + 1000;
        axios.get(`http://localhost:4200/setsecret/${randomValue}`).then(res =>{
            console.log("El numero adivinar"+randomValue);
            alert(res.data.message);
          //console.log(res.data);
      })
    }
  
    handleSubmit(event) {
       axios.get(`http://localhost:4200/guess/${this.state.value}`).then(res =>{
          alert(res.data.result);
          //console.log(res.data);
      })
      event.preventDefault();    
    }

 
    render() {
      return (
          <div>
              <h1>Code Breaker</h1>
              <form onSubmit={this.handleSubmit}>
          <label>
            Guess Number:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="button" value="Play" onClick={this.goToPlay} />
          <input type="submit" value="Submit" />
        </form>
        </div>        
      );
    }
  }

  export default CodeBreaker;