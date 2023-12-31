import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Hidden,
} from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
    // eslint-disable-next-line
  }, [location]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <img
          className={classes.image}
          src='/memories.png'
          alt='icon'
          height='60'
        />
        <Typography
          component={Link}
          to='/'
          className={classes.heading}
          variant='h2'
          align='center'
        >
          Memories
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <>
            <Hidden mdUp>
              <div className={classes.profile}>
                <Avatar
                  className={classes.purple}
                  alt={user?.result.name}
                  src={user?.result.imageUrl}
                  id='profile-button'
                  aria-controls='profile-menu'
                  aria-haspopup='true'
                  aria-expanded={openMenu ? 'true' : undefined}
                  onClick={handleClick}
                >
                  {user?.result.name.charAt(0)}
                </Avatar>
                <Menu
                  id='profile-menu'
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'profile-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Typography className={classes.userName} variant='h6'>
                      {user?.result.name}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button
                      variant='contained'
                      className={classes.btn}
                      color='secondary'
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </div>
            </Hidden>
            <Hidden smDown>
              <div className={classes.profileDesk}>
                <Avatar
                  className={classes.purple}
                  alt={user?.result.name}
                  src={user?.result.imageUrl}
                >
                  {user?.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant='h6'>
                  {user?.result.name}
                </Typography>
                <Button
                  variant='contained'
                  className={classes.logout}
                  color='secondary'
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </Hidden>
          </>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
            className={classes.btn}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
