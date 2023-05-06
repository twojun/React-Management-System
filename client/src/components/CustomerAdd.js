import React from 'react';
import post from 'axios';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withStyles } from '@mui/styles';

const styles = theme => ({
  hidden: {
    display: 'none'
  }
});


class CustomerAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false
    }
  }

  // handleFormSubmit 함수는 매개변수로 이벤트 변수를 받게 된다.
  handleFormSubmit = (e) => {
    e.preventDefault()
    this.addCustomer()
      .then((response) => {
        console.log(response.data);
        this.props.stateRefresh();
      })
    this.setState({
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false
    })
  }

  // handleFileChange : 파일의 값이 변경되었을 때 불러올 수 있는 함수
  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
    })
  }

  // handleValueChange : 일반적인 텍스트 값이 변경되었을 때 불러올 수 있는 함수
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }


  addCustomer = () => {
    const url = '/api/customers';
    const formData = new URLSearchParams();
    formData.append('image', this.state.file);
    formData.append('name', this.state.userName);
    formData.append('birthday', this.state.birthday);
    formData.append('gender', this.state.gender);
    formData.append('job', this.state.job);

    /* 기본적으로 파일이 포함된 데이터를 서버로 전송하기 위해선
    웹 표준에 맞는 Header를 추가해야 함. 
    'multipart/form-data' : 서버로 전달하고자 하는 데이터의 파일이 포함되어 있을 때 설정
    */
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config);
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false
    })
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>고객 추가하기</Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>고객 추가</DialogTitle>
          <DialogContent>
            <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/> <br/>
            <label htmlFor="raised-button-file">
              <Button variant="contained" color="primary" component="span" name="file">
                {this.state.fileName === " " ? "프로필 이미지 선택" : this.state.fileName}
              </Button><br/>
            </label>
            <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
            <TextField label="생년월일" type="birthday" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
            <TextField label="성별" type="gender" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
            <TextField label="직업" type="job" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
      /*
      <form onSubmit={this.handleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/> <br/>
        <button type="submit">고객 정보 추가하기</button>
      </form>
      */
    );
  }
}

export default withStyles(styles)(CustomerAdd);