import { useState } from "react";
import { NoteClass } from "../classes/NoteClass";
import Draggable from "react-draggable";
import Typography from "@mui/material/Typography/Typography";
import Card from "@mui/material/Card/Card";
import IconButton from "@mui/material/IconButton/IconButton";
import TextField from "@mui/material/TextField/TextField";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import './css/DraggableNote.css';

const DraggableNote = ( { note, deleteNote, editNote }: { note: NoteClass, deleteNote: any, editNote: any } ) =>
{
  const [ currentX, setX ] = useState<number>( note.currentX );
  const [ currentY, setY ] = useState<number>( note.currentY );

  const [ content, setContent ] = useState<string>( note.content );

  const handleStop = ( _event: any, dragElement: any ) =>
  {
    setX( dragElement.x )
    setY( dragElement.y )
    note.currentX = currentX;
    note.currentY = currentY;
  };

  const updateContent = ( content: string ) =>
  {
    setContent( content );
    note.content = content;
  };

  return (
    <Draggable position={{ x: currentX, y: currentY }} onStop={handleStop} disabled={note.edit}>
      <Card className="draggable-card" style={{ backgroundColor: note.backgroundColour }}>
        <IconButton onClick={deleteNote}>
          <RemoveCircleOutlineIcon />
        </IconButton>
        <IconButton onClick={editNote}>
          {note.edit ? <SaveIcon /> : <EditIcon />}
        </IconButton>
        {note.edit ? <TextField value={content} variant="outlined" onChange={( event ) => updateContent( event.target.value )} /> : <Typography>{content}</Typography>}
      </Card>
    </Draggable >
  );
}

export default DraggableNote;
