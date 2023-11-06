import { _electron as electron, expect, test } from '@playwright/test'

test('homepage has title and links to intro page', async () => {
    const app = await electron.launch({ args: ['.', '--no-sandbox'] })
    const isPackaged = await app.evaluate(async ({ app }) => {
        // This runs in Electron's main process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.isPackaged
    })

    expect(isPackaged).toBe(false)

    const page = await app.firstWindow()
    
    const inputs = await page.locator('input').all()
    expect((await inputs[0].textContent())!.length).toBe(0)
    expect((await inputs[1].textContent())!.length).toBe(0)

    const sendBtn = page.getByRole('button', { name: 'Send', exact: true })
    await sendBtn.click()
    const openFileBtn = page.getByText('Open a File')
    await openFileBtn.click()
    const sendTwoWayMsgBtn = page.getByRole('button', {
        name: 'Send Two-way Message',
        exact: true,
    })
    await sendTwoWayMsgBtn.click()
    const getDbMsgBtn = page.getByText('Get message from DB')
    await getDbMsgBtn.click()
    const getAllUsersBtn = page.getByText('Get all users')
    await getAllUsersBtn.click()
    const addUserBtn = page.getByText('Add a user')
    await addUserBtn.click()

    /* 
  Send
Open a File
Send Two-way Message
Get message from DB
Get all users
Add a user
  */
    expect(await page.title()).toBe('Electron + Vite + React')
    await page.screenshot({ path: 'e2e/screenshots/example.png' })
})
