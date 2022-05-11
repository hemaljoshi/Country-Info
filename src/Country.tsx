import React, { useState } from 'react';
import { TextField, Button, Paper, Grid, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Country = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState('');

  const onSubmitHandler = () => {
    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then((res) => navigate('/info', { state: { response: res.data } }));
  };

  return (
    <>
      <Grid item lg={4} sm={4} md={4} xs={4}>
        <Paper sx={{ p: 4 }} elevation={10}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='h5'
              sx={{ mb: 3, fontWeight: 700 }}
              color='primary'
            >
              Search Country Data
            </Typography>
            <TextField
              label='Enter Country'
              variant='outlined'
              fullWidth
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <Button
              variant='contained'
              onClick={onSubmitHandler}
              disabled={country === ''}
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default Country;
