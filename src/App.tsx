import React from 'react';
import './App.less';
import styles from './person.module.css';
import { Button } from 'antd';
import logo from './static/imges/logo192.png'
import bg1 from './static/imges/bg.png'
const logo1 = require('./static/imges/logo192.png')

function App() {
  console.log(process.env.REACT_APP_API_HOST)
  return (
    <div className="App" >
      <img src="./logo192.png" alt="" />
      <img src={logo} alt="" />
      <img src={logo1} alt="" />
      <div className={styles.box}>3233</div>
      <Button type="primary">Button</Button>
      <img src={bg1} alt="" />
    </div>
  );
}

export default App;


