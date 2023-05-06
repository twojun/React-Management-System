import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

class CustomerDelete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  deleteCustomer(id) {
    // ex) /api/customers/7
    const url = '/api/customers/' + id;
    fetch(url, {
      method: 'DELETE'
    })
    // this.props.stateRefresh();
    .then((reponse) => {
      this.props.stateRefresh();
    })
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>고객 데이터 삭제</Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle onClose={this.handleClose}>
            삭제 경고
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>선택한 고객 정보가 삭제됩니다.</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={(e) => { this.deleteCustomer(this.props.id) }}>삭제</Button>
            <Button variant="outlined" color="primary" onClick={(e) => { this.handleClose(this.props.id) }}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomerDelete;