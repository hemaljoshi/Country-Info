import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CountryView from './CountryView';

const CountryInfo = () => {
  const { state }: any = useLocation();
  const response: any = state?.response;

  return (
    <>
      <Grid item lg={10} sm={10} md={10} xs={10}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 2,
          }}
        >
          <Typography
            variant='h5'
            sx={{ mb: 3, fontWeight: 700 }}
            color={state !== null ? 'primary' : 'error'}
          >
            Country Data {state !== null ? '' : ' is null'}
          </Typography>
        </Box>
      </Grid>
      {response?.map((row: any, index: number) => (
        <CountryView key={index} row={row} />
      ))}
    </>
  );
};

export default CountryInfo;
