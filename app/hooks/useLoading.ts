import { useState } from 'react'

interface UseLoadingState {
    isLoading: boolean
    setLoading: (value: boolean) => void
}

const useLoadingState = (initialState: boolean = false): UseLoadingState => {
    const [isLoading, setIsLoading] = useState<boolean>(initialState)

    const setLoading = (value: boolean) => setIsLoading(value)

    return { isLoading, setLoading }
}

export default useLoadingState