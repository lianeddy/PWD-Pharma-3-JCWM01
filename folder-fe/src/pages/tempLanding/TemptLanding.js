import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userAction';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';

const TemptLanding = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      }));
      
      
    const classes = useStyles();
    const history = useHistory();

    return(
         <div className={classes.root}>
      <Button onClick={()=>{
          localStorage.removeItem('token');
          props.logoutUser();
        //   history.replace('/login')
          

      }} variant="contained">Default</Button>
      
    </div>
    )

}

const mapDispatchToProps = {
    logoutUser,
}

export default connect(null, mapDispatchToProps)(TemptLanding);