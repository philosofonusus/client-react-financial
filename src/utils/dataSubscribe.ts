import socket from '../connection'
import socketSubscribe from './socketSubscribe'
import * as socketActions from '../socketActions'
import { store } from '../redux/store'

import sendMessage from '../redux/actions/sendMessage.action';
import debounce from './debounce'

const dataSubscriber = (coding: 'fact' | 'current') => {
    socket.onmessage = event => {
        const data = JSON.parse(event.data)
        socketSubscribe(data)
        if(data.name === socketActions.candleGenerated) {
            //@ts-ignore
            debounce(() => store.dispatch(sendMessage(data.msg, coding)), 100)()
        }
    }
}

export default dataSubscriber;