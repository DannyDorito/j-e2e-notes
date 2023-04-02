import Box from '@mui/material/Box/Box';
import { ColourList } from '../helpers/RandomColour';

const ColourPallet = ({ updateColourPallet }: { updateColourPallet: any }) => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        {ColourList.map((colour, index) => (
          <Box
            key={`colour-${index}`}
            onClick={updateColourPallet(colour.backgroundColour, colour.textColour)}
            sx={{
              height: 30,
              width: 30,
              backgroundColor: colour.backgroundColour,
              border: 2,
              borderColor: colour.textColour,
              borderRadius: 1,
            }}
          ></Box>
        ))}
      </Box>
    </>
  );
};

export default ColourPallet;
