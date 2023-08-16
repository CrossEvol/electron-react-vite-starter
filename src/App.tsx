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
    const [filePath, setFilePath] = React.useState('')

    const handleClickOpenFile = async () => {
        const filePathFromMain = await window.electronAPI.openFile()
        setFilePath(filePathFromMain)
    }

    return (
        <Container maxWidth='sm'>
            <Box sx={{ my: 4 }}>
                <Typography variant='h4' component='h1' gutterBottom>
                    Material UI Vite.js example in TypeScript
                </Typography>
                <Stack spacing={1} direction={'column'}>
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
