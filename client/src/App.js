import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import LogInScreen from "./Screens/LogIn";
import TitleBar from "./Components/TitleBar";
import CharSelect from "./Screens/CharSelect";
import AuthHelperMethods from "./Components/_AuthHelper";
import withAuth from "./Components/withAuth";
import PrebattleScreen from "./Screens/CharVsMon";
import LogIn from "./Screens/LogIn";
import SignUp from "./Components/SignUp";
import BattleScreen from "./Screens/Battle";
import monsters from "./data/Monster.json";

const ENEMY_TIMER = 3000;
const ENEMY_TIMER_BIG= 9000;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: null,
      monster: monsters[Math.floor(Math.random() * monsters.length)],
      counter: 0,
    };
    this.enemyInterval = "";
  }

  enemyAttack = () => {
     const valueEnemyAttack = parseInt(this.state.monster.smallAttack);
     this.setState({
       character : {
         ...this.state.character,
         health: this.state.character - valueEnemyAttack
       }
     })
  };

  // componentDidMount() {
  //   this.enemyInterval = setInterval(this.enemyAttack, ENEMY_TIMER, ENEMY_TIMER_BIG);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.enemyInterval);
  // }

  componentDidUpdate() {
    console.log(this.state.character);
    console.log(this.state.monster)
  }

  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout();
    alert("you have successfully logged out");
  };

  chooseCharacter = value => {
    this.setState({
      character: value
    });
  };

  handleSmallAttackMonster = value => {
    this.setState({
      monster : {
        ...this.state.monster,
        // health: this.state.monster.health - value,
        health: this.state.monster.health - value
      }
    })

  };

  handleBigAttackMonster = value => {
    this.setState({
      monster : {
        ...this.state.monster,
        health: this.state.monster.health -value
      }
    })
  };

  handleSpecialAttackMonster = value => {
    this.setState({
      monster : {
        ...this.state.monster,
        health : this.state.monster.health - value
      }
    })
  };

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={LogInScreen} />
            <Route exact path="/signup" component={SignUp} />
            <Route
              path="/CharSelect"
              render={() => (
                <CharSelect
                  chooseCharacter={this.chooseCharacter}
                  globalState={this.state}
                />
              )}
            />
            <Route
              path="/BattleScreen"
              render={() => 
              <BattleScreen
                handleSmallAttackMonster={this.handleSmallAttackMonster}
                handleBigAttackMonster={this.handleBigAttackMonster}
                handleSpecialAttackMonster={this.handleSpecialAttackMonster}
                globalState={this.state} 
                />
              }
            />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
