import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import { InputLabel, MenuItem } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save';
import IconButton from "@mui/material/IconButton"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import DeleteIcon from '@mui/icons-material/Delete';
const EditNoteForm = ({ note, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <MenuItem
                key={user.id}
                value={user.id}>
                {user.username}
            </MenuItem>
        )
    })

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (

            <IconButton
                type="submit"
                title="Save"
                onClick={onDeleteNoteClicked}

            >
                <DeleteIcon />
            </IconButton>
        )
    }

    const content = (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    component="form" noValidate onSubmit={e => e.preventDefault()}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',

                    }}
                >
                    <Box
                        sx={{
                            marginTop: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Edit Note #{note.ticket}
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <IconButton
                                type="submit"
                                title="Save"
                                onClick={onSaveNoteClicked}
                                disabled={!canSave}
                            >
                                <SaveIcon />
                            </IconButton>
                            {deleteButton}
                        </Box>

                    </Box>

                    <Typography component="h1" variant="h5">
                        {errContent}
                    </Typography>

                    <Box sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            fullWidth
                            label="Title"
                            autoFocus
                            id="note-title"
                            name="title"
                            type="text"
                            autoComplete="off"
                            value={title}
                            onChange={onTitleChanged}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={4}
                            id="text"
                            name="text"
                            label="Note"
                            value={text}
                            onChange={onTextChanged}
                        />

                        <FormControlLabel
                            control={<Checkbox id="note-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged} />} label="Mark as done" />


                        <InputLabel sx={{ marginTop: 4 }} id="selectlabel">Assigned to:</InputLabel>

                        <Select
                            margin="normal"
                            fullWidth
                            labelId="selectlabel"
                            id="demo-select-small"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}

                        </Select>

                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }} paragraph>
                            Created:<br />{created}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }} paragraph>
                            Updated:<br />{updated}
                        </Typography>
                    </Box>
                </Box>

            </Container>
        </>
    )

    return content
}

export default EditNoteForm