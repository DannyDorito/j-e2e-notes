import { ColourList } from '../helpers/RandomColour';
import { ColourClass } from '../classes/ColourClass';
import { useState } from 'react';
import { error } from '../helpers/ThemeProvider';
import { HexColorPicker as HexColourPicker } from 'react-colorful';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';

const ColourPallet = ({
  updateColourPallet,
  currentColour,
}: {
  updateColourPallet: any;
  currentColour: ColourClass;
}) => {
  const [customColour, setCustomColour] = useState<string>('#000000');
  const [showHexColourPicker, setShowHexColourPicker] = useState<boolean>(false);

  const updateShowHexColourPicker = () => {
    setShowHexColourPicker(!showHexColourPicker);
  };

  const saveCustomColour = () => {
    updateColourPallet(customColour, '#fff');
    updateShowHexColourPicker();
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 1 }}
      >
        {ColourList.map((colour, index) => (
          <Box
            key={`colour-${index}`}
            onClick={() => updateColourPallet(colour.backgroundColour, colour.textColour)}
            sx={{
              height: 30,
              width: 30,
              backgroundColor: colour.backgroundColour,
              border: 2.25,
              borderColor:
                colour.backgroundColour === currentColour.backgroundColour
                  ? error
                  : colour.textColour,
              borderRadius: 1,
            }}
          ></Box>
        ))}
        <Box
          key='colour-custom'
          onClick={updateShowHexColourPicker}
          sx={{
            height: 30,
            width: 30,
            backgroundColor: customColour,
            border: 2.25,
            borderColor: '#000',
            borderRadius: 1,
          }}
        ></Box>
        {showHexColourPicker && (
          <Box className='colour-picker-box'>
            <HexColourPicker color={customColour} onChange={setCustomColour} />
            <IconButton
              className='draggable-button'
              onClick={saveCustomColour}
              sx={{ color: currentColour.textColour }}
            >
              <SaveTwoToneIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ColourPallet;
