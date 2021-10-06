import React from 'react';
import {AreaSeries, Chart, ChartCanvas, XAxis, YAxis} from 'react-financial-charts';
import {scaleTime} from 'd3-scale';
import {curveMonotoneX} from 'd3-shape';
import DataType from '../types/Data.type'

const AreaChart: React.FC<{
    data: any | DataType, type: 'svg' | 'hybrid',
    spline: Boolean, width: number, height: number
}> = ({data, type, width, height}) => {

    return(

        <ChartCanvas 
        ratio={3} 
        data={data} 
        width={width} 
        height={height} 
        seriesName="Test"
        type={type}
        xScale={scaleTime()}
        xExtents={[]}
        //@ts-ignore
        xAccessor={d => d?.from}
        >
            <Chart id={0} yExtents={d => d?.bid}>
                <XAxis axisAt="bottom" orient="bottom" ticks={6} />
				<YAxis axisAt="left" orient="left" />
                {/*@ts-ignore*/}
                <AreaSeries  yAccessor={d => d?.bid} interpolation={curveMonotoneX}/>
            </Chart>
        </ChartCanvas>
    )
}

export default AreaChart;