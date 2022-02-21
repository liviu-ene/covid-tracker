import React, { useEffect, useState } from "react";
import Cards from "./components/Cards/Cards"
import Chart from "./components/Chart/Chart"
import CountryPicker from "./components/CountryPicker/CountryPicker"
import styles from "./App.module.css"
import { fetchData, fetchDailyData } from "./api";
import { createTheme, ThemeProvider } from "@material-ui/core";

const App = () => {

    const theme = createTheme({
        typography: {
          color: 'rgb(51, 51, 51)',  
          fontFamily: [
            'Fira Sans',
            'sans-serif',
          ].join(','),
        },
      });

    const [data, setData] = useState({});
    const [dailyData, setDailyData] = useState({})

   useEffect(() => {
      const fetchDataAPI = async () => {
        setData(await fetchData())
      }
      fetchDataAPI();
    }, []) 

    useEffect(() => {
      const fetchDailyDataAPI = async () => {
        setDailyData(await fetchDailyData())
      }
      fetchDailyDataAPI();
    }, []) 

    const handleCountryChange = async (country) => {
      setData(await fetchData(country));
      setDailyData(await fetchDailyData(country));
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.container}>        
                <CountryPicker handleCountryChange={handleCountryChange} />
                <Cards data={data}/>        
                <Chart dailyData={dailyData}/>                         
            </div>
        </ThemeProvider>
    )
}

export default App;