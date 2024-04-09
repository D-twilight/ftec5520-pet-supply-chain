import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Collapse} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import image2 from '../pages/image2.png';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    alignItems: 'flex',
    height: '100vh',
    fontFamily: 'sans-serif',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  colorText: {
    color: 'black',
    fontWeight: 600,
  },
  container: {
    alighnItems:'flex',
    textAlign: 'left',
    paddingTop: '200px',
    paddingLeft: '60px',

  },
  title: {
    color: 'black',
    fontSize: '4rem',
    fontWeight: 400,
    
  },
  
}));

export default function Home() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
       <div className={classes.root} id="header">
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Level the playing field <br /> 
            with<span className={classes.colorText}> Level Finance.  </span>
          </h1>
          <Scroll to="place-to-visit" smooth={true}>
            <Button variant="contained">Learn More
            </Button>
          </Scroll>
        </div>
      </Collapse>
    </div>
    
      );
}