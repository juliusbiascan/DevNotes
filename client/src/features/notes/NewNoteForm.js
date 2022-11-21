import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
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

const NewNoteForm = ({ users }) => {

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => {
        return (
            <MenuItem key={user.id}
                value={user.id}>{user.username}</MenuItem>
        )
    })

    const content = (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    component="form" noValidate onSubmit={onSaveNoteClicked}
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
                            New Note
                        </Typography>
                        <IconButton
                            type="submit"
                            title="Save"
                            disabled={!canSave}
                        >
                            <SaveIcon />
                        </IconButton>
                    </Box>

                    <Typography component="h1" variant="h5">
                        {error?.data?.message}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="title"
                            name="title"
                            label="Title"
                            autoFocus
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

                    </Box>
                </Box>

            </Container>
        </>
    )

    return content
}

export default NewNoteForm