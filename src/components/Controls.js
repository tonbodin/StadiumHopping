import React from 'react';
import '../App';
import {
    textStyle,
    sliderStyle,
    startButtonStyle,
    titleTextStyle,
} from '../common/styles';
import { Slider, Button, Menu, MenuItem, IconButton } from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withStyles } from '@material-ui/core/styles';

export const Controls = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const MyIconButton = withStyles({
        root: {
            color: '#146474',
        },
    })(IconButton);

    return (
        <div className="controls">
            <div className="title-container">
                <div className="control-container">
                    <div style={titleTextStyle}>Stadium Hopping</div>
                    <div style={{ width: 5 }} />
                    <MyIconButton
                        size="small"
                        aria-label="replay"
                        disabled={props.running}
                        onClick={props.replay}
                    >
                        <AutorenewIcon />
                    </MyIconButton>
                </div>
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{ color: 'white ' }}
                    disabled={props.running}
                    endIcon={<ArrowDropDownIcon />}
                >
                    Current Dataset: {props.dataset}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={() => {
                            props.setDataset('NFL');
                            handleClose();
                        }}
                    >
                        NFL
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            props.setDataset('NBA');
                            handleClose();
                        }}
                    >
                        NBA
                    </MenuItem>
                </Menu>
            </div>
            <div>
                <div style={{ ...textStyle, width: 420, textAlign: 'center' }}>
                    {props.evaluating}
                </div>
            </div>
            <div className="control-box">
                <Button
                    onClick={props.startButton}
                    variant="contained"
                    disabled={props.running}
                    style={startButtonStyle}
                >
                    Start
                </Button>
                <div style={{ width: 25 }}></div>
                <div className="slider">
                    <div style={textStyle}>Delay(ms)</div>
                    <Slider
                        min={50}
                        max={1500}
                        value={props.delay}
                        onChange={props.onChangeSlider}
                        step={50}
                        style={sliderStyle}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                    />
                </div>
            </div>
        </div>
    );
};
