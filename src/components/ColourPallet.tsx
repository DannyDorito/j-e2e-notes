import { ColourList } from '../helpers/RandomColour';
import { ColourPalletProps } from '../props/ColourPalletProps';
import { useState } from 'react';
import { black, error } from '../helpers/ThemeProvider';
import { HexColorPicker as HexColourPicker } from 'react-colorful';
import { Box, Tooltip, IconButton } from '@mui/material';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';

const ColourPallet = ({ props }: { props: ColourPalletProps }) => {
  const [customColour, setCustomColour] = useState<string>('#fff');
  const [showHexColourPicker, setShowHexColourPicker] = useState<boolean>(false);

  const updateShowHexColourPicker = () => {
    setShowHexColourPicker(!showHexColourPicker);
  };

  const saveCustomColour = () => {
    props.updateColourPallet(customColour, '#fff', '#fff', true);
    updateShowHexColourPicker();
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 1 }}
      >
        {ColourList.map((colour, index) => (
          <Tooltip title={colour.primary} key={`colour-${index}-tooltip`}>
            <Box
              key={`colour-${index}-box`}
              onClick={() =>
                props.updateColourPallet(
                  colour.primary,
                  colour.secondary,
                  colour.accent,
                  colour.isCustom,
                )
              }
              sx={{
                height: 30,
                width: 30,
                backgroundColor: colour.primary,
                border: 2.25,
                borderColor:
                  colour.primary === props.currentColour.primary && !props.currentColour.isCustom
                    ? error
                    : colour.accent,
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
              backgroundColor: props.currentColour.isCustom ? props.currentColour.primary : black,
              border: 2.25,
              borderColor: props.currentColour.isCustom ? error : props.currentColour.accent,
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
                sx={{ color: props.currentColour.accent }}
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
