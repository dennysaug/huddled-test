import React, {useState, useEffect} from "react";
import Weather from "./Weather"


export default function Forecast()
{
    const [forecast, setForecast] = useState([]);
    const [lastUpdate, setLastUpdate] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            try {

                const response = await fetch('/api/forecast');
                const data = await response.json();

                if(data.data) {
                    setForecast(data.data);
                    setLastUpdate(data.last_updated);
                } else {
                    setError(data.error);
                }



            } catch (error) {

                //can be set to a variavel and show error
                console.log(error);


            }
        }
        fetchData();



    },[]);

    if(!error) {
        return (
            <>
                <div className="card-header text-right">{lastUpdate && `Last Update ${lastUpdate}` }</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card-group">
                                {forecast.length == 0 && <h3>Loading...</h3>}

                                {forecast && forecast.map(data => <Weather details={data} key={data.day}></Weather>)}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
            <div className="card-header">Error!</div>
            <div className="card-body">
                <h4 class="text-danger">{error}</h4>
            </div>
            </>
        );
    }

}
