import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';


const App = props => {
  const [personState, setPersonsState] = useState({
    persons: [
            { id : '1', name: 'Max', age: 28},
            { id : '2', name: 'Manu', age: 29},
            { id : '3', name: 'John', age: 26}
          ],
    otherstate: 'some other value',
    showPersons: false
  });

  const switchNameHandler = (newName) => { 
    const doesShow = personState.showPersons;
      // console.log('was clicked!');
      setPersonsState({ //只会改变persons,不会merge到原来的里面，所以点击完，otherstate会消失
        persons: [
            { name: newName, age: 28},
            { name: 'Manu', age: 29},
            { name: 'John', age: 27}
        ],
        otherstate:personState.otherstate,
        showPersons: doesShow,
      });
    };
    console.log("000000");//比如说我每次delete的时候，都要重新执行到这里一次，效率低？
    const nameChangedHandler = (event, id) => { 
      const doesShow = personState.showPersons;
      const personIndex = personState.persons.findIndex(p => {
        return p.id === id;
      }
        );

      const person = {
        ...personState.persons[personIndex]
      };
      person.name = event.target.value;
      const persons = [...personState.persons];
      persons[personIndex] = person;
      //就觉得这边还要复制一下好奇怪啊，但也不会改

      // const person = personState.persons[personIndex];
      // person.name = event.target.value;
      setPersonsState( //只会改变persons,不会merge到原来的里面，所以点击完，otherstate会消失
        {persons : persons,
        showPersons : doesShow,
      });
      
      
      
     
      // personState.persons[personIndex].name = event.target.value;
      // const person = {
      //   ...personState.persons[personIndex]
      // };
      // person.name = event.target.value;
     
    };

    const togglePersonsHandler = () =>{
        const doesShow = personState.showPersons;
        setPersonsState({
          persons: [
            { name: 'newName', age: 28},
            { name: 'Manu', age: 29},
            { name: 'John', age: 27}
        ],
        otherstate:personState.otherstate,
        showPersons : !doesShow
      });
    }

    const deletePersonHandler = (personIndex) => {
      // const persons = personState.persons.slice();
      const persons = [...personState.persons]
      const doesShow = personState.showPersons;
      persons.splice(personIndex, 1);
      setPersonsState({
        persons: persons,
        otherstate:personState.otherstate,
        showPersons : doesShow
      });
    }

    const style = {
      backgroundColor: 'white',
      font:'inherit',
      border:'1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };

    let personn = null;
    if(personState.showPersons){
      personn = (
        <div>
          {personState.persons.map((person,index) =>{
            return <Person
              name={person.name}
              click={()=> deletePersonHandler(index)}
              age={person.age}
              key={person.id}
              changed={(event) => nameChangedHandler(event, person.id)}
              />
          })}
      </div>
      );
    }

  return(
    <div className = "App">
      <h1>HI, I AM REACT</h1>
      <p>This is really working!</p>
      <button 
      style={style}
      onClick={togglePersonsHandler}> Switch Name </button> 
      {/* { personState.showPersons ? 
          <div>
            <Person name = {personState.persons[0].name} age = {personState.persons[0].age}  /> 
            <Person 
            name = {personState.persons[1].name} 
            age = {personState.persons[1].age}  
            click = {switchNameHandler.bind(this,'aaaaa')}
            changed = {nameChangedHandler}> 
            My hobbies: React</Person>
            <Person name = {personState.persons[2].name}  age = {personState.persons[2].age}  />
          </div> : null
      }  */}
      {personn}
      {/* <h1>{personState.persons[0].name}</h1> */}
    </div>
  );
}

// class App extends Component{
//   state = {
//     persons: [
//       { name: 'Max', age: 28},
//       { name: 'Manu', age: 29},
//       { name: 'John', age: 26}
//     ],
//     otherstate: 'some other value'
//   }
  // switchNameHandler = () => { 
  //   // console.log('was clicked!');
  //   this.setState({
  //     persons: [
  //         { name: 'Maxxx', age: 28},
  //         { name: 'Manu', age: 29},
  //         { name: 'John', age: 27}
  //     ]
  //   })
  // }
  // render(){
// }

export default App;
