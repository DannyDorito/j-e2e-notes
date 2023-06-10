import { ColourList } from '../helpers/RandomColour';
import { ColourPalletProps } from '../props/ColourPalletProps';
import { useState } from 'react';
import { backgroundColour, error, primary, textColour } from '../helpers/ThemeProvider';
import { HexColorPicker as HexColourPicker } from 'react-colorful';
import {
  Box,
  Tooltip,
  IconButton,
  Modal,
  Typography,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';

const ColourPalletModal = ({ props }: { props: ColourPalletProps }) => {
  const [customPrimaryColour, setCustomPrimaryColour] = useState<string>(
    props.currentColour.primary,
  );
  const [customSecondaryColour, setCustomSecondaryColour] = useState<string>(
    props.currentColour.secondary,
  );
  const [customAccentColour, setCustomAccentColour] = useState<string>(props.currentColour.accent);
  const [showCustomColourEditor, setShowCustomColourEditor] = useState<boolean>(false);

  const updateShowCustomColourEditor = () => {
    setShowCustomColourEditor(!showCustomColourEditor);
  };

  const saveCustomColour = () => {
    props.updateColourPallet(customPrimaryColour, customSecondaryColour, customAccentColour, true);
    updateShowCustomColourEditor();
  };

  return (
    <>
      <Modal open={props.showColourPallet} onClose={() => props.setShowColourPallet(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: backgroundColour,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography textAlign='center' variant='h6' sx={{ color: textColour }}>
            Note Colours
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 1,
            }}
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
                      colour.primary === props.currentColour.primary &&
                      !props.currentColour.isCustom
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
                onClick={updateShowCustomColourEditor}
                sx={{
                  height: 30,
                  width: 30,
                  backgroundColor: props.currentColour.isCustom
                    ? props.currentColour.primary
                    : backgroundColour,
                  border: 2.25,
                  borderColor: props.currentColour.isCustom ? error : props.currentColour.accent,
                  borderRadius: 1,
                  cursor: 'pointer',
                }}
              ></Box>
            </Tooltip>
          </Box>
          {showCustomColourEditor && (
            <>
              <Box>
                <Divider sx={{ marginBottom: '12px', marginTop: '12px' }}></Divider>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant='body1' width='50%' sx={{ color: textColour }}>
                    Primary Colour
                  </Typography>
                  <Box>
                    <Box className='colour-picker-box'>
                      <HexColourPicker
                        color={customPrimaryColour}
                        onChange={setCustomPrimaryColour}
                      />
                    </Box>
                    <TextField
                      id='custom-primary-colour'
                      variant='standard'
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>#</InputAdornment>,
                      }}
                      value={customPrimaryColour.substring(1).toUpperCase()}
                      onChange={(e) => setCustomPrimaryColour('#' + e.target.value.toUpperCase())}
                    ></TextField>
                  </Box>
                </Box>
                <Divider sx={{ marginBottom: '12px', marginTop: '12px' }}></Divider>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant='body1' width='50%' sx={{ color: textColour }}>
                    Secondary Colour
                  </Typography>
                  <Box>
                    <Box className='colour-picker-box'>
                      <HexColourPicker
                        color={customSecondaryColour}
                        onChange={setCustomSecondaryColour}
                      />
                    </Box>
                    <TextField
                      id='custom-secondary-colour'
                      variant='standard'
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>#</InputAdornment>,
                      }}
                      value={customSecondaryColour.substring(1).toUpperCase()}
                      onChange={(e) => setCustomSecondaryColour('#' + e.target.value.toUpperCase())}
                    ></TextField>
                  </Box>
                </Box>
                <Divider sx={{ marginBottom: '12px', marginTop: '12px' }}></Divider>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant='body1' width='50%' sx={{ color: textColour }}>
                    Accent Colour
                  </Typography>
                  <Box>
                    <Box className='colour-picker-box'>
                      <HexColourPicker
                        color={customAccentColour}
                        onChange={setCustomAccentColour}
                      />
                    </Box>
                    <TextField
                      id='custom-accent-colour'
                      variant='standard'
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>#</InputAdornment>,
                      }}
                      value={customAccentColour.substring(1).toUpperCase()}
                      onChange={(e) => setCustomAccentColour('#' + e.target.value.toUpperCase())}
                    ></TextField>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '32px',
                  }}
                >
                  <Tooltip title='Save Custom Colour'>
                    <IconButton
                      className='draggable-button'
                      onClick={saveCustomColour}
                      sx={{ color: props.currentColour.accent }}
                    >
                      <SaveTwoToneIcon sx={{ color: primary }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </>
          )}
          {!showCustomColourEditor && (
            <Box
              sx={{
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '32px',
              }}
            >
              <Tooltip title='Save'>
                <IconButton
                  className='draggable-button'
                  onClick={() => props.setShowColourPallet(false)}
                  sx={{ color: props.currentColour.accent }}
                >
                  <SaveTwoToneIcon sx={{ color: primary }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ColourPalletModal;
