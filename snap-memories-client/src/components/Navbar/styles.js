import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 25px',
    },
  },
  heading: {
    fontSize: '40px',
    color: '#00A4E5',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px',
    },
  },
  image: {
    marginRight: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  profileDesk: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '300px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  btn: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
    },
  },
}));
