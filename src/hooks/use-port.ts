import { useEffect } from 'react'

export function usePort() {
  useEffect(() => {
    const handleUpdatePort = async () => {
      try {
        const { port } = await window.electronAPI.updatePort()
        localStorage.setItem('port', port.toString())
      } catch (error) {
        console.error('Failed to update port:', error)
      }
    }

    handleUpdatePort()
  }, [])
}
