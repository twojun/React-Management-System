import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { CircularProgress } from '@mui/material';
import { withStyles } from '@mui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: "auto",
    overflowY: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {}
})


/*
1) constructor()

2) componentWillMount()

3) render()

4) componentDidMount()

컴포넌트의 props 또는 state가 변경되는 경우 -> shouldComponentUpdate()
- React의 경우 알아서 상태변화를 감지하여 View를 재구성함
*/


class App extends Component {

  // state : 컴포넌트 내부에서 변경될 수 있는 데이터를 처리하고자 할 때 사용, props는 고정값.
  state = {
    customers: "",
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0: completed + 1 });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map(c => { 
              return ( <Customer key={c.id} id={c.id} image={c.image} birthday={c.birthday} name={c.name} gender={c.gender} job={c.job} /> );
             }) : 
             <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
              </TableCell>
             </TableRow>
             }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);