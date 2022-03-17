import React from 'react';
import {render} from 'react-dom';
import Forecast from "./Forecast"

export default function App() {
    return (
        <div className="container">
            <div className="row justify-content-center mt-4">
                <div className="col-md-8">
                    <div className="card">
                        <Forecast></Forecast>
                    </div>
                </div>
            </div>
        </div>
    );
}

if (document.getElementById('root')) {
    render(<App />, document.getElementById('root'));
}
