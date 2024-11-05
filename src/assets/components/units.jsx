function Units({value, temperature}){

    {/*Having the temperature over*/}
    temperature = temperature - 273.1
    const degree = ['°C', '°F']
    let degreeUnit = ''

    {/*Fahrenheit or Celcius*/}
    if (value){
        {/*Fahrenheit*/}
        temperature = 1.8*temperature + 32,2
        degreeUnit = degree[value]
    } else{
        {/*Celcius*/}
        temperature = Math.round(temperature,2)
        degreeUnit = degree[value]
    }

    return(
        <div className="units">
            <h2 className="temperature">Temperature: {temperature.toFixed(1)}{degreeUnit}</h2>
        </div>
    )
}

export default Units;