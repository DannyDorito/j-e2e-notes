import { NoteClass } from "../classes/NoteClass";
import Draggable, { } from "react-draggable";
import { Card } from "@mui/material";
import Button from "@mui/material/Button/Button";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Typography from "@mui/material/Typography/Typography";
import { useState } from "react";

const DraggableNote = ( { note }: { note: NoteClass } ) =>
{
  const [ x, setX ] = useState( note.currentX );
  const [ y, setY ] = useState( note.currentY );
  const handleStop = ( event: any, dragElement: any ) =>
  {
    setX( dragElement.x )
    setY( dragElement.y )
    note.currentX = x;
    note.currentY = y;
  };
  return (
    <>
      <Draggable position={{ x: x, y: y }} onStop={handleStop} disabled={note.deleted}>
        <Card style={{ width: "40%", color: "#ffffff" }}>
          <Button ><RemoveCircleOutlineIcon key={`${ note.id }-remove`} /></Button>
          <Typography style={{ color: "black" }}>{note.content}</Typography>
        </Card>
      </Draggable>
    </>
  );
}

export default DraggableNote;
