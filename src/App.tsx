import React from 'react';
import './App.less';
import styles from './person.module.css';
import { Button } from 'antd';
function App() {
  console.log(process.env.REACT_APP_API_HOST)
  return (
    <div className="App" >
      <div className={styles.box}>333</div>
      <Button type="primary">Button</Button>
    </div>
  );
}

export default App;


