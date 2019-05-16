import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import { withFirebase } from '../../config/firebase/context';

const SignOutButton = ({ firebase }) => (
   <MenuItem onClick={firebase.doSignOut}>Log out</MenuItem> 
);

export default withFirebase(SignOutButton);