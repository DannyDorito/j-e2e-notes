import { render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

import { NoteClass } from '../classes/NoteClass';
import DraggableNote from '../components/DraggableNote';

describe('When the page is rendered', () => {
  it('should render <DraggableNote /> TSX component', async () => {
    const testNote: NoteClass = new NoteClass(
      'title',
      'this is a test note',
      uuidv4(),
      new Date().toUTCString(),
      { x: 20, y: 20, z: 1, width: '100px', height: '100px' },
    );
    render(<DraggableNote note={testNote} deleteNote={undefined} editNote={undefined} />);

    expect(await screen.findByText(testNote.content)).toBeInTheDocument();
  });
});
