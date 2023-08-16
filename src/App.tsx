import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import ProTip from './ProTip'
import { Button, Divider, Stack } from '@mui/material'

function Copyright() {
    return (
        <Typography variant='body2' color='text.secondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://mui.com/'>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    )
}

export default function App() {
    const [message, setMessage] = React.useState('')
    const [twoWayMessage, setTwoWayMessage] = React.useState('')
    const [filePath, setFilePath] = React.useState('')

    const handleClickOpenFile = async () => {
        const filePathFromMain = await window.electronAPI.openFile()
        setFilePath(filePathFromMain)
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const handleTwoWayMessageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTwoWayMessage(e.target.value)
    }

    const handleSendMessage = async () => {
        await window.electronAPI.sendMessage(message)
    }

    const handleSendTwoWayMessage = async () => {
        const returnMsg = await window.electronAPI.sendTwoWayMessage(message)
        setTwoWayMessage(returnMsg)
    }

    return (
        <Container maxWidth='sm'>
            <Box sx={{ my: 4 }}>
                <div>
                    <Typography
                        component={Link}
                        href='https://www.electronjs.org/docs/latest/tutorial/ipc'
                        variant='h4'
                        target='_blank'
                        className='no-underline'
                        gutterBottom
                    >
                        Inter-Process Communication
                    </Typography>
                </div>
                <Divider />
                <Stack spacing={1} direction={'column'}>
                    <div>
                        <Typography
                            variant='button'
                            display='block'
                            gutterBottom
                        >
                            Pattern 1: Renderer to main (one-way)
                        </Typography>
                        Message:{' '}
                        <input
                            id='title'
                            value={message}
                            onChange={handleMessageChange}
                        />
                        <button
                            id='btn'
                            type='button'
                            onClick={handleSendMessage}
                        >
                            Send
                        </button>
                    </div>
                    <Divider />
                    <div>
                        <Typography
                            variant='button'
                            display='block'
                            gutterBottom
                        >
                            Pattern 2: Renderer to main (two-way)
                        </Typography>
                        <Button
                            variant='contained'
                            onClick={handleClickOpenFile}
                        >
                            Open a File
                        </Button>
                        File path: <strong id='filePath'>{filePath}</strong>
                    </div>
                    <Divider />
                    <div>
                        <Typography
                            variant='button'
                            display='block'
                            gutterBottom
                        >
                            Pattern 2: Renderer to main (two-way) with params
                        </Typography>
                        Two-way Message:{' '}
                        <input
                            id='title'
                            value={twoWayMessage}
                            onChange={handleTwoWayMessageChange}
                        />
                        <button
                            id='btn'
                            type='button'
                            onClick={handleSendTwoWayMessage}
                        >
                            Send Two-way Message
                        </button>
                    </div>
                    <Divider />
                </Stack>
                <ProTip />
                <Copyright />
            </Box>
        </Container>
    )
}
