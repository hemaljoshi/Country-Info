import React, { useState } from 'react';
import { Paper, Grid, Box, Typography, Button, Stack } from '@mui/material';
import axios from 'axios';

const apiKey = '15605a10ec939594939b7d45fb436484';

const CountryView = ({ row }: any) => {
  const [weatherData, setWeatherData] = useState<any>({});

  const getWeatherInfo = (countryCapital: string) => {
    const capital = countryCapital
      .toString()
      .toLowerCase()
      .split(' ')
      .join('-');
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`
      )
      .then((res: any) => {
        if (!res?.data?.error) {
          const tempObj = res?.data?.current;
          setWeatherData(tempObj);
        }
      });
  };

  return (
    <Grid item lg={10} sm={10} md={10} xs={10}>
      <Paper sx={{ p: 4, my: 2 }} elevation={10}>
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
                <b>Capital</b>: {row?.capital}
              </Typography>
              <Typography>
                <b>Population:</b> {row?.population}
              </Typography>
              <Typography>
                <b>Lat:</b>
                {` ${row?.latlng[0]} `}
                <b>Lng:</b>
                {` ${row?.latlng[1]}`}
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 3,
              }}
            >
              {Object.keys(weatherData).length === 0 && (
                <Button
                  variant='contained'
                  onClick={() => getWeatherInfo(row?.capital)}
                >
                  Capital Weather
                </Button>
              )}
              {Object.keys(weatherData).length !== 0 && (
                <Box>
                  <Stack direction='row' spacing={2} alignItems='center'>
                    <Typography>
                      <b>temperature</b>: {weatherData?.temperature}
                    </Typography>
                    <img
                      src={weatherData?.weather_icons?.toString()}
                      style={{
                        height: '35px',
                        width: '35px',
                        borderRadius: 5,
                      }}
                    />
                  </Stack>
                  <Typography>
                    <b>Wind speed:</b> {weatherData?.wind_speed}
                  </Typography>
                  <Typography>
                    <b>Precip: </b>
                    {weatherData?.precip}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item lg={4} sm={4} md={4} xs={4}>
            <img
              src={`${row.flags.png}`}
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default CountryView;
