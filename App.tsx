import Country from './src/Country';
import { Container, Grid } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CountryInfo from './src/CountryInfo';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Container maxWidth='lg'>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            minHeight='100vh'
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Routes>
              <Route path='/' element={<Country />} />
              <Route path='/info' element={<CountryInfo />} />
            </Routes>
          </Grid>
        </Container>
      </BrowserRouter>
    </>
  );
}
