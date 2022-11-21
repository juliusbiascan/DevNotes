import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom'
import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'

const Note = ({ noteId }) => {

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        }),
    })

    const navigate = useNavigate()


    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <>
                <Card sx={{ marginTop: 1 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {note.username[0]}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="add to favorites" onClick={handleEdit}>
                                <EditIcon />
                            </IconButton>
                        }
                        title={note.username}
                        subheader={`Created: ${created} - Updated: ${updated}`}
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {note.title}
                        </Typography>
                        <Typography  variant="body2" color="text.secondary" style={{ whiteSpace: 'pre-wrap' }}>
                            {note.text}
                        </Typography>
                        
                    </CardContent>

                    <CardActions disableSpacing>

                        <Typography>
                            {`Status: ${(note.completed ? 'Completed' : 'Open')}`}
                        </Typography>

                    </CardActions>


                </Card>

            </>
        )
    } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote