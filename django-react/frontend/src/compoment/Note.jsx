import React from "react";
import "../styles/Note.css"
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Note({ notes, onDelete }) {
    return (
        <TransitionGroup ref={null}>
            {notes.map((note) => (

                <CSSTransition
                    ref={null}
                    key={note.id}
                    timeout={500}
                    classNames="note"
                >
                    <div className="note" >
                        <div className="note-container">
                            <p className="note-title">{note.title}</p>
                            <p className="note-content">{note.content}</p>
                            <p className="note-date" ref={null}>{new Date(note.created_at).toLocaleDateString("en-US")}</p>
                            <button className="delete-button" onClick={() => onDelete(note.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </CSSTransition>
            ))}
        </TransitionGroup>

    );
}

export default Note