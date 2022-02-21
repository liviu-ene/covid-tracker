import React, {useState} from "react";
import { Line } from "react-chartjs-2";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
    } from 'chart.js';
import {useGmailTabsStyles, useGmailTabItemStyles} from '@mui-treasury/styles/tabs';    
import { createTheme, ThemeProvider } from "@material-ui/core";
import styles from "./Chart.module.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
    );
 
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && children}
          </div>
        );
      }   
      
      const theme = createTheme({
        overrides: {
          MuiTabs: {
            root: {
              position: 'relative',
              bottom: '10px',
              backgroundColor: 'transparent !important',
              boxShadow: 'unset !important',
              
            },
            flexContainer: {
              gap: '13px',
            }
          },
          MuiButtonBase: {
            root: {
              '&:hover' : {
                backgroundColor: 'unset !important'
              },
              
            },
        },
          MuiTab: {
            wrapper: {
              fontSize: '13px !important',
              justifyContent: 'center !important',
              fontFamily: 'Rubik, sans-serif !important',
              textTransform: 'uppercase !important',
              letterSpacing: '1px',
            }       
          },
          PrivateTabIndicator: {
            root: {
            '& > div': {
              margin: '-7px 65px !important',
              height: '2px !important',
            },
          }}
      }
      });
    
    const indicatorColors = ['#247ba0', '#3d9970', '#C70039']; 

const Chart = ({dailyData}) => {
 
    const [index, setindex] = useState(0)

    const tabsStyles = useGmailTabsStyles({ indicatorColors });
    const tabItem1Styles = useGmailTabItemStyles({ color: indicatorColors[0] });
    const tabItem2Styles = useGmailTabItemStyles({ color: indicatorColors[1] });
    const tabItem3Styles = useGmailTabItemStyles({ color: indicatorColors[2] });
    return (
        <div className={styles.container}>
          <ThemeProvider theme={theme}>
            <Tabs centered classes={tabsStyles} value={index} onChange={(e, index) => setindex(index)} TabIndicatorProps={{
        children: <div className={`MuiIndicator-${index}`} />,
      }}>
                <Tab classes={tabItem1Styles} disableTouchRipple label="Cases"  />
                <Tab classes={tabItem2Styles} disableTouchRipple label="Recoveries"  />
                <Tab classes={tabItem3Styles} disableTouchRipple label="Deaths" />
            </Tabs>
            </ThemeProvider>
            <TabPanel value={index} index={0}>
                <Line
                data={{
                    datasets: [
                        {
                            data: dailyData.confirmed,                      
                            borderColor: indicatorColors[0],
                            fill: true,  
                            backgroundColor: 'rgba(36, 123, 160, 0.8)', 
                            lineTension: 0,
                            
                                         
                        },                                   
                        ]
                }}
                options={{
                    plugins:{
                        legend: {
                        display: false
                        },
                        
                    }
                }}
                />
            </TabPanel>
            <TabPanel value={index} index={1}>
                <Line
                data={{
                    datasets: [
                        {
                            data: dailyData.recovered,
                            borderColor: indicatorColors[1],
                            fill: true,   
                            backgroundColor: 'rgba(61,153,112,0.8)', 
                        },
                        ]
                }}
                options={{
                    spanGaps: true,
                    plugins:{
                        legend: {
                        display: false
                        },
                    },
                }}
                />
            </TabPanel>
            <TabPanel value={index} index={2}>
                <Line
                data={{
                    datasets: [
                        {
                            data: dailyData.deaths,
                            borderColor: indicatorColors[2],
                            fill: true,    
                            backgroundColor: 'rgba(199,0,57,0.8)', 
                            
                        },
                        ]
                }}
                options={{
                    plugins:{
                        legend: {
                        display: false
                        }
                    }
                }}
                />
            </TabPanel>
        
        </div>
    )
}

export default Chart;