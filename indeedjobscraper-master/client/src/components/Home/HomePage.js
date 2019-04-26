import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Job Searcher
                                </h1>
                                <p className="lead"> Providing thousands of job opportunities for you. Easy applied and flex search</p>
                                <hr/>
                                <Link to="/jobs" className="btn btn-lg btn-info mr-2">Go to Job Page</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;