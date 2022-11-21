import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton"
import {FormControlLabel , Checkbox} from '@mui/material';
import { InputLabel } from "@mui/material"
import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


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
                            Edit User
                        </Typography>
                        <Box sx={{ display: "flex" }}>

                            <IconButton
                                type="submit"
                                title="Save"
                                onClick={onSaveUserClicked}
                                disabled={!canSave}
                            >
                                <SaveIcon />
                            </IconButton>

                            <IconButton
                                type="submit"
                                title="Delete"
                                onClick={onDeleteUserClicked}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                    </Box>

                    <Typography component="h1" variant="h5">
                        {errContent}
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

                        <FormControlLabel
                            control={
                                <Checkbox id="user-active"
                                    name="user-active"
                                    type="checkbox"
                                    checked={active}
                                    onChange={onActiveChanged} />} label="Active" />

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
export default EditUserForm