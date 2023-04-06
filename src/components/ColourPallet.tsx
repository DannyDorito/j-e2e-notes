import { ColourList } from '../helpers/RandomColour';
import { ColourInterface } from '../classes/ColourInterface';
import { useState } from 'react';
import { black, error } from '../helpers/ThemeProvider';
import { HexColorPicker as HexColourPicker } from 'react-colorful';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import Tooltip from '@mui/material/Tooltip/Tooltip';

const ColourPallet = ({
  updateColourPallet,
  currentColour,
}: {
  updateColourPallet: any;
  currentColour: ColourInterface;
}) => {
  const [customColour, setCustomColour] = useState<string>('#fff');
  const [showHexColourPicker, setShowHexColourPicker] = useState<boolean>(false);

  const updateShowHexColourPicker = () => {
    setShowHexColourPicker(!showHexColourPicker);
  };

  const saveCustomColour = () => {
    updateColourPallet(customColour, '#fff', true);
    updateShowHexColourPicker();
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 1 }}
      >
        {ColourList.map((colour, index) => (
          <Tooltip title={colour.backgroundColour} key={`colour-${index}-tooltip`}>
            <Box
              key={`colour-${index}-box`}
              onClick={() =>
                updateColourPallet(colour.backgroundColour, colour.accentColour, colour.isCustom)
              }
              sx={{
                height: 30,
                width: 30,
                backgroundColor: colour.backgroundColour,
                border: 2.25,
                borderColor:
                  colour.backgroundColour === currentColour.backgroundColour &&
                  !currentColour.isCustom
                    ? error
                    : colour.accentColour,
                borderRadius: 1,
                cursor: 'pointer',
              }}
            ></Box>
          </Tooltip>
        ))}
        <Tooltip title='Custom Colour'>
          <Box
            key='colour-custom'
            onClick={updateShowHexColourPicker}
            sx={{
              height: 30,
              width: 30,
              backgroundColor: currentColour.isCustom ? currentColour.backgroundColour : black,
              border: 2.25,
              borderColor: currentColour.isCustom ? error : currentColour.accentColour,
              borderRadius: 1,
              cursor: 'pointer',
            }}
          ></Box>
        </Tooltip>
        {showHexColourPicker && (
          <Box className='colour-picker-box'>
            <HexColourPicker color={customColour} onChange={setCustomColour} />
            <Tooltip title='Save Custom Colour'>
              <IconButton
                className='draggable-button'
                onClick={saveCustomColour}
                sx={{ color: currentColour.accentColour }}
              >
                <SaveTwoToneIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ColourPallet;
