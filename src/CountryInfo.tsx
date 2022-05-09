import React, { useState } from 'react';
import { Paper, Grid, Box, Typography, Button, Stack } from '@mui/material';
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';

const apiKey = '4349cc613a8f90e92129439637d95fa6';

const CountryInfo = () => {
  const location: any = useLocation();
  if (location.state === null) {
    return <Navigate to='/' />;
  }

  const [weatherData, setWeatherData] = useState<any>({});

  const getWeatherInfo = () => {
    const capital = location?.state?.response?.capital
      .toString()
      .toLowerCase()
      .split(' ')
      .join('-');
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`
      )
      .then((res: any) => {
        setWeatherData(res.data.current);
      });
  };

  return (
    <>
      <Grid item lg={10} sm={10} md={10} xs={10}>
        <Paper sx={{ p: 4 }} elevation={10}>
          <Grid
            container
            justifyContent='center'
            columns={{ xs: 4, sm: 8, md: 12 }}
            spacing={2}
          >
            <Grid item lg={4} sm={4} md={4} xs={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                }}
              >
                <Typography>
                  <b>Capital</b>: {location?.state?.response?.capital}
                </Typography>
                <Typography>
                  <b>Population:</b> {location?.state?.response?.population}
                </Typography>
                <Typography>
                  <b>LatLng:</b>
                  {` ${location?.state?.response?.latlng}`}
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 3,
                }}
              >
                {Object.keys(weatherData).length === 0 && (
                  <Button variant='contained' onClick={getWeatherInfo}>
                    Capital Weather
                  </Button>
                )}
                {Object.keys(weatherData).length !== 0 && (
                  <Box>
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Typography>
                        <b>temperature</b>: {weatherData.temperature}
                      </Typography>
                      <img
                        src={weatherData.weather_icons.toString()}
                        style={{
                          height: '35px',
                          width: '35px',
                          borderRadius: 5,
                        }}
                      />
                    </Stack>
                    <Typography>
                      <b>Wind speed:</b> {weatherData.wind_speed}
                    </Typography>
                    <Typography>
                      <b>Precip: </b>
                      {weatherData.precip}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item lg={4} sm={4} md={4} xs={4}>
              <img
                src={`${location?.state?.response.flags.png}`}
                style={{ width: '100%', height: '100%', borderRadius: 5 }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default CountryInfo;
