
import useTitle from "../../hooks/useTitle"
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
import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
    useTitle('DevNotes: New User')

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}
            > {role}</option >
        )
    })


    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


    const content = (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    component="form" noValidate onSubmit={onSaveUserClicked}
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
                            New User
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
                            id="username"
                            name="username"
                            label="username"
                            autoFocus
                            value={username}
                            onChange={onUsernameChanged}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password "
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={onPasswordChanged}
                        />

                        <InputLabel sx={{ marginTop: 4 }} id="selectlabel">ASSIGNED ROLES:</InputLabel>

                        <select
                            margin="normal"
                            fullWidth
                            labelId="selectlabel"
                            id="roles"
                            name="roles"
                            multiple={true}
                            size="3"
                            value={roles}
                            onChange={onRolesChanged}
                        >
                            {options}
                        </select>

                    </Box>
                </Box>

            </Container>
        </>
    )

    return content
}
export default NewUserForm