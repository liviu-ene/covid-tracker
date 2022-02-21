import axios from "axios";

const url = 'https://disease.sh/v3/covid-19';

export const fetchData = async (country) => {

    let changeableUrl = `${url}/all`;

    if(country) {
        changeableUrl = `${url}/countries/${country}?strict=true`
    }

    try {
        const response = await axios.get(changeableUrl);

        const modifiedData = {
            confirmed: response.data.cases,
            recovered: response.data.recovered,
            deaths: response.data.deaths,
        }    
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async (country) => {

    let changeableUrl = `${url}/historical/all?lastdays=all`;

    if(country) {
        changeableUrl = `${url}/historical/${country}?lastdays=all`
    }

    try {
        const response = await axios.get(changeableUrl)
        if(country) {
            const modifiedData = {
                confirmed: response.data.timeline.cases,
                recovered: Object.fromEntries(Object.entries(response.data.timeline.recovered).filter(([_, v]) => v !== 0)),
                deaths: response.data.timeline.deaths,
            }

            return modifiedData;
        } else {

            const modifiedData = {
                confirmed: response.data.cases,
                recovered: Object.fromEntries(Object.entries(response.data.recovered).filter(([_, v]) => v !== 0)), //removes empty datapoints from API
                deaths: response.data.deaths,
        }
            
            return modifiedData;
        }
        
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const response = await axios.get('https://covid19.mathdro.id/api/countries')
        
        const modifiedData = response.data.countries.map((country) => country.name).filter((country) =>
        !['Antarctica','Summer Olympics 2020','Winter Olympics 2022','Taiwan*','Holy See','Burma', 'West Bank and Gaza'].includes(country));
        return modifiedData;


    } catch (error) {
        
    }
}