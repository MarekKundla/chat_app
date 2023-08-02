import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import io from 'socket.io-client'
import queryString from 'query-string'

let socket

const Chat = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [searchParams] = useSearchParams()

    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const { name, room } = Object.fromEntries([...searchParams]) //queryString.parse(window.location.search)

        socket = io(ENDPOINT, {
            withCredentials: true,
        })

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room })
    }, [ENDPOINT, searchParams])

    return (
        <div>
            <div>Chat </div>
        </div>
    )
}

export default Chat
