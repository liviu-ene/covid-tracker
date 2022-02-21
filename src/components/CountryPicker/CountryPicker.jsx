import React, {useState, useEffect} from "react";
import { Select, FormControl, MenuItem, Typography, Grid} from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";

const CountryPicker = ({handleCountryChange}) => {
    const [fetchedCountries, setFetchedCountries] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
            
        }

        fetchAPI();
        
    }, [])
    return (
        <Grid container spacing={2} justifyContent="center" className={styles.container}>
            <Grid item xs={12} md={3} container justifyContent="flex-start" alignContent="center">
                <Typography variant="h3" className={styles.typography}>Covid-19 Tracker</Typography>
            </Grid>
            <Grid item xs={12} md={3} container justifyContent="flex-end" alignContent="center">
                <FormControl variant="outlined" className={styles.formControl} >
                    <Select displayEmpty defaultValue="" onChange={(e) => handleCountryChange(e.target.value)} sx={{ width: 300}}>
                        <MenuItem value="">Global</MenuItem>
                        {fetchedCountries.map((country, index) => <MenuItem key={index} value={country}>{country}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            
        </Grid>

        
    )
}

export default CountryPicker;