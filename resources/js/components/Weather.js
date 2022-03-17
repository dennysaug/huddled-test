import React from "react";

export default function Weather(props)
{
    const details = props.details

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{details.day}</h3>
                <small>{details.weather}</small>
                <p className="card-text">
                    <div className="row mt-2 mb-2 pt-4">
                        <div className="col-md-4">
                            <i className="fas fa-temperature-high fa-2x"></i>
                        </div>
                        <div className="col-md-8 pull-left text-danger">
                            {details.max_temp}
                        </div>
                    </div>
                    <div className="row mt-2 mb-2 pt-4">
                        <div className="col-md-4">
                            <i className="fas fa-temperature-low fa-2x"></i>
                        </div>
                        <div className="col-md-8 pull-left text-primary">
                            {details.min_temp}
                        </div>
                    </div>
                    <div className="row mt-2 mb-2 pt-4">
                        <div className="col-md-4">
                            <i className="fas fa-tint fa-2x"></i>
                        </div>
                        <div className="col-md-8 pull-left">
                            {details.rain}%
                        </div>
                    </div>
                    <div className="row mt-2 mb-2 pt-4">
                        <div className="col-md-4">
                            <i className="fas fa-wind fa-2x"></i>
                        </div>
                        <div className="col-md-8 pull-left">
                            {details.wind} <small>mph</small>
                        </div>
                    </div>
                </p>

            </div>
        </div>
    );
}
