import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import io from 'socket.io-client'
// import queryString from 'query-string'

import InfoBar from '../InfoBar/InfoBar'
import Messages from '../Messages/Messages'
import Input from '../Input/Input'
import TextContainer from '../TextContainer/TextContainer'

import './Chat.css'

let socket

const Chat = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState('')
    const [searchParams] = useSearchParams()

    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const { name, room } = Object.fromEntries([...searchParams]) //queryString.parse(window.location.search)

        socket = io(ENDPOINT, {
            withCredentials: true,
        })

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error)
            }
        })

        return () => {
            socket.emit('disconnect')

            socket.off()
        }
    }, [ENDPOINT, searchParams])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users)
        })
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat
