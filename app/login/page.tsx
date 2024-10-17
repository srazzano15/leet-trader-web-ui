'use client'
import Card from '../components/Card'
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { getTokens, validateAccessToken } from '../api/session'
import { useRouter } from 'next/navigation'
import { loginUser } from '../api/auth'


const Login: React.FC = () => {
    const [formData, setFormData] = useState<{email: string, password: string}>({
        email: '',
        password: ''
    })
    const router = useRouter()
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        
        const res = await loginUser(formData)
        if (res && !res.error) {
            router.push('/dashboard')
        }

    }
    useEffect(() => {
        const { accessToken } = getTokens()
        if (accessToken !='undefined' && validateAccessToken()) {
            router.push('/dashboard')
        }
    }, [router])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    } 

    return (
        <Card 
            styles='w-full lg:w-1/3 mx-auto'
        >
            <form className='grid grid-flow-row' onSubmit={handleSubmit} method='POST'>
                <h3 className='text-2xl col-span-1 mb-4 text-center'>Login</h3>
                <label htmlFor="email" className='col-span-1'>Email</label>
                <input 
                    type="text" 
                    value={formData.email} 
                    name='email' 
                    className='border mb-2 p-2 rounded-md'
                    onChange={handleChange}
                />
                <label htmlFor="password" className='col-span-1'>Password</label>
                <input 
                    type="password" 
                    value={formData.password} 
                    name='password' 
                    className='border mb-2 p-2 rounded-md'
                    onChange={handleChange}
                />
                <button 
                    type='submit'
                    className='transition duration-150 ease-in-out bg-green-400 mt-3 py-2 rounded-md hover:bg-teal-400'
                >Login</button>
            </form>
        </Card>
    )
}

export default Login