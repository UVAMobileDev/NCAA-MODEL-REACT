import React from 'react'
import {Doughnut} from 'react-chartjs-2'

function PieChart(props){
    console.log(props);
    let a = props.correct;
    let b = props.incorrect;
    let c = props.name;
    const data = {
        labels:[c,'Not'+c],
        datasets:[
            {
            label: 'prediction result',
            data:[a,b],
            backgroundColor:[
                'rgba(112, 140, 255, 1)',
                'rgba(210, 65, 149, 1)'  
            ]
        }
        ]
    }
    const options ={
        title :{
            display: true,
            text:'Doughnut Chart'
        },
        maintainAspectRatio: false,
        responsive: false

    }
    return <Doughnut data = {data} width={300}
	height={300} options = {options}/>
}
export default PieChart
