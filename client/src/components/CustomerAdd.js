import React from 'react';
import post from 'axios';
import axios from 'axios';


class CustomerAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: ''
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
      fileName: ''
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
  
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/> <br/>
        이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
        생년월일: <input type="birthday" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
        성별 : <input type="gender" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
        직업 : <input type="job" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
        <button type="submit">고객 정보 추가하기</button>
      </form>
    );
  }
}

export default CustomerAdd;