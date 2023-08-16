import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import ProTip from './ProTip'
import { Button, Stack } from '@mui/material'

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
    const [title, setTitle] = React.useState('')
    const [filePath, setFilePath] = React.useState('')

    const handleClickOpenFile = async () => {
        const filePathFromMain = await window.electronAPI.openFile()
        setFilePath(filePathFromMain)
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleSetWinTitle = async () => {
        await window.electronAPI.sendMessage(title)
    }

    return (
        <Container maxWidth='sm'>
            <Box sx={{ my: 4 }}>
                <Typography variant='h4' component='h1' gutterBottom>
                    Material UI Vite.js example in TypeScript
                </Typography>
                <Stack spacing={1} direction={'column'}>
                    <div>
                        Title:{' '}
                        <input
                            id='title'
                            value={title}
                            onChange={handleTitleChange}
                        />
                        <button
                            id='btn'
                            type='button'
                            onClick={handleSetWinTitle}
                        >
                            Set
                        </button>
                    </div>
                    <Button variant='contained' onClick={handleClickOpenFile}>
                        Open a File
                    </Button>
                    File path: <strong id='filePath'>{filePath}</strong>
                </Stack>
                <ProTip />
                <Copyright />
            </Box>
        </Container>
    )
}
