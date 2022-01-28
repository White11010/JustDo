import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { createTheme } from '@mui/material/styles';
import {makeStyles, ThemeProvider} from "@mui/styles";

const useStyles = makeStyles({
    root: {
        maxHeight: '50px',
        width: '300px'
    }
})

export default function DateAndTimePicker() {
    const classes = useStyles();

    const [value, setValue] = React.useState(new Date());

    const logDate = () => {
        console.log(value.toISOString());
    }

    const handleChange = (newValue) => {
        setValue(newValue);
        logDate();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack  sx={{
                marginLeft: '12px',
                flexBasis: 'calc(50% - 12px)',
                marginBottom: '37px',

            }}>
                <DateTimePicker
                    label="Set Deadline"
                    value={value}
                    onChange={handleChange}
                    format="DD-MM-YYYY"
                    renderInput={(params) => <TextField {...params} sx={
                        {
                            input: {
                                height: '22px',
                                padding: '15px 20px',
                                borderRadius: '10px',
                                fontFamily: 'Circe',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontSize: '18px',
                                color: '#000850'
                            }
                        }}/>}
                />
            </Stack>
        </LocalizationProvider>
    );
}