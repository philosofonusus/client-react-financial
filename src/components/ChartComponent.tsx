import React, {useState, useEffect} from 'react';
import Chart from './Chart';
import {useSelector, useDispatch} from 'react-redux'
import DataType from '../types/Data.type'
import dataConnection from '../utils/dataSubscribe';

import {RootState} from '../redux/store'
import flushAll from '../redux/actions/flush.action'

const ChartComponent = () => {
    const data: DataType[] = useSelector((state: RootState) => state.data)
    const [isSpline, setIsSpline] = useState<Boolean>(false)
    const [type, setType] = useState<'current' | 'fact'>('current')
    const [key, setKey] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(flushAll())
        dataConnection(type)
        setKey(key + 1)
    }, [type])

    return (<>
            <div>
                <button onClick={() => setType(type === 'current' ? 'fact' : 'current')}>
                    {type === 'current' ? 'fact' : 'current'}
                </button>
                <button onClick={() => setIsSpline(!isSpline)}>
                    {isSpline ? 'spline' : 'nospline'} 
                </button>
            </div>
        <Chart key={key} width={500} height={500} type="svg" spline={isSpline} data={data}/>
        </>
    )
}

export default ChartComponent;