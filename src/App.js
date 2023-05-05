import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';

const customers = [{
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '홍길동',
  'birthday': '981229', 
  'gender': '남자', 
  'job': '대학생'
}, 
{
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '홍길동',
  'birthday': '981129', 
  'gender': '남자', 
  'job': '백엔드 개발자'
}, 
{
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '홍길동',
  'birthday': '981029', 
  'gender': '남자', 
  'job': '프론트엔드 개발자'
}];

class App extends Component {
  render() {
    return (
      <div>
        { customers.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} gender={c.gender} job={c.job} /> ); }) }
      </div>
    );
  }
}

export default App;
