import React from 'react'
import {Doughnut} from 'react-chartjs-2'

function PieChart(props){
    console.log(props);
    let a = props.correct;
    let b = props.incorrect;
    const data = {
        labels:['Close','NotClose'],
        datasets:[
            {
            label: 'prediction result',
            data:[a,b],
            backgroundColor:[
                'rgba(255, 99, 132, 1)',
                'rgba(255, 205, 86, 1)'  
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
    return <Doughnut data = {data} width={400}
	height={400} options = {options}/>
}
export default PieChart