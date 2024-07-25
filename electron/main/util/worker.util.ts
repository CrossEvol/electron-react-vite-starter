import path, { join } from 'node:path'
import { Worker } from 'node:worker_threads'

export const startServerInWorker = () => {
    const worker = new Worker(path.resolve(__dirname, '..', 'worker/worker.js'))
    worker.on('error', (err) => {
        console.error('Worker thread error:', err)
    })
    worker.on('exit', (code) => {
        if (code !== 0) console.error(`Worker stopped with exit code ${code}`)
    })
}
