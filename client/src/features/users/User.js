import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'
import { red } from '@mui/material/colors';
import { IconButton, ListItemButton } from '@mui/material';

const User = ({ userId }) => {

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            // <tr className="table__row user">
            //     <td className={`table__cell ${cellStatus}`}>{user.username}</td>
            //     <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
            //     <td className={`table__cell ${cellStatus}`}>
            //         <button
            //             className="icon-button table__button"
            //             onClick={handleEdit}
            //         >
            //             <FontAwesomeIcon icon={faPenToSquare} />
            //         </button>
            //     </td>
            // </tr>
            <>
                <ListItem>

                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {user.username[0]}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.username} secondary={userRolesString} />
                    <ListItemButton onClick={handleEdit}>
                        <IconButton
                           
                            size="small"
                        >
                            <EditIcon />
                        </IconButton>

                    </ListItemButton>

                </ListItem>
            </>



        )

    } else return null
}

const memoizedUser = memo(User)

export default memoizedUser