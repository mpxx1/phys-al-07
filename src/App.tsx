import './App.css'
import {useState} from "react";
import {Axis, Heading, Legend, LineSeries, Plot} from "react-plot";


type Point = {
    x: number
    y: number
}


function App() {

    const [amplitude1, setAmplitude1] = useState("")
    const [amplitude2, setAmplitude2] = useState("")
    const [frequency1, setFrequency1] = useState("")
    const [frequency2, setFrequency2] = useState("")
    const [phaseShift, setPhaseShift] = useState("")

    const amp1 = Number.parseFloat(amplitude1)
    const amp2 = Number.parseFloat(amplitude2)
    const freq1 = Number.parseFloat(frequency1)
    const freq2 = Number.parseFloat(frequency2)
    const pShift = Number.parseFloat(phaseShift)

    if (amp1 < 0 || amp2 < 0 || freq1 < 0 || freq2 < 0)
        alert("Amplitude and frequency must have positive values!")

    const data: Point[] = []

    for (let i = 0; i < Math.PI * 4; i += 0.001) {
        data.push(
            {
                x: amp1 * Math.sin(freq1 * i + pShift),
                y: amp2 * Math.sin(freq2 * i)
            }
        )
    }

    return (
        <div className={"wrapper"}>
            <div className={"inputWrapper"}>

                <label> Enter values to see plots </label>

                <div>
                    <input
                        placeholder={"First channel amplitude"}
                        value={amplitude1}
                        onChange={(event) => setAmplitude1(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder={"Second channel amplitude"}
                        value={amplitude2}
                        onChange={(event) => setAmplitude2(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder={"First channel frequency, Hz"}
                        value={frequency1}
                        onChange={(event) => setFrequency1(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder={"Second channel frequency, Hz"}
                        value={frequency2}
                        onChange={(event) => setFrequency2(event.target.value)}
                    />

                    <input
                        placeholder={"Phase shift, rad"}
                        value={phaseShift}
                        onChange={(event) => setPhaseShift(event.target.value)}
                    />
                </div>

            </div>

            <div className={"plot1"}>

                <Plot
                    width={1200}
                    height={700}
                >

                    <Heading
                        title={"Lissajous curve"}
                    ></Heading>

                    <Axis
                        id="x"
                        position="bottom"
                        displayPrimaryGridLines
                    />
                    <Axis
                        id="y"
                        position="left"
                        displayPrimaryGridLines
                    />
                    <Legend position="right" />


                    <LineSeries
                        data={ data }
                        xAxis="x"
                        yAxis="y"
                        label={"Lissajous curve"}
                        lineStyle={{ strokeWidth: 3 }}
                        displayMarkers={false}
                    />

                </Plot>

            </div>
        </div>
    )
}


export default App
