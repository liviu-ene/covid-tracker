import React from "react";
import {Card, CardContent, Typography, Grid, createTheme, ThemeProvider} from "@material-ui/core"
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames"

const Cards = (props) => {
    const theme = createTheme({
        overrides: {
            MuiCardContent: {
              root: {
                "&:last-child": {
                  paddingBottom: 16,
               },
              },
            },
          },
    })

    return (
        <div className={styles.container}>
            <ThemeProvider theme={theme}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>              
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>INFECTED</Typography>
                        <Typography variant="h5" className={styles.number}><CountUp start={0} end={props.data.confirmed} duration={2} separator="."></CountUp></Typography>
                        <Typography variant="body1" >Number of COVID-19 cases</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>RECOVERED</Typography>
                        <Typography variant="h5" className={styles.number}><CountUp start={0} end={props.data.recovered} duration={2} separator="."></CountUp></Typography>
                        <Typography variant="body1">Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>DEATHS</Typography>
                        <Typography variant="h5" className={styles.number}><CountUp start={0} end={props.data.deaths} duration={2} separator="."></CountUp></Typography>
                        <Typography variant="body1">Number of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
            </ThemeProvider>
        </div>
    )
}

export default Cards;