function CityDate({Date ,City}){
    let  cityName = City.slice(City.lastIndexOf('/') + 1,City.length)
    let date;
    let twoWords = cityName.split("_").length

    if(twoWords > 1){
        cityName = cityName.split("_").join(" ")
    }
   
    
    if(Date){
        date = Date.formatted
    }
    return(
    <div className="city__date">
        <h3>{cityName} : {date}</h3>
    </div>
  )
}

export default CityDate;