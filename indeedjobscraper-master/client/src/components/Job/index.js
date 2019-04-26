import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getJobPosting} from '../../actions/userActions';

import CollapseCheckbox from './job_block/CollapsCheckbox';
import LoadMoreCards from './loadMoreCards';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';

class Jobs extends Component{

    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            tag: [],
            location: [],
            isSaved: []
        },
        initials: {
            tag: [
                {
                    "_id": "full stack developer",
                    "name": "full stack developer"
                },
                {
                    "_id": "web developer",
                    "name": "web developer"
                }
            ],
            locations: [
                {
                    "_id": "Toronto, ON",
                    "name": "Toronto"
                },
                {
                    "_id": "Vancouver, ON",
                    "name": "Vancouver"
                }
            ],
            isSaved: [
                {
                    "_id": "true",
                    "name": "Saved Jobs"
                }
            ]
        }
    };

    componentDidMount() {
        this.props.dispatch(getJobPosting(
            this.state.skip,
            this.state.limit,
            this.state.filters
        ))
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user.savedJob !== nextProps.user.savedJob || this.props.user.unSavedJob !== nextProps.user.unSavedJob || this.props.user.deleteJob !== nextProps.user.deleteJob) {
            this.props.dispatch(getJobPosting(
                0,
                this.props.user.jobs.length,
                this.state.filters
            ))
        }
    }

    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters};
        newFilters[category] = filters;

        this.showFilteredResults(newFilters);  // 初始filter
        this.setState({
            filters: newFilters
        })
    };

    showFilteredResults = (filters) => {
        this.props.dispatch(getJobPosting(
            0,
            this.state.limit, // limit = 6
            filters
        )).then(() => {
            this.setState({skip: 0})   // skip在mongoose中是用来做pagination的， 这里是在前六个结果里做filter
        })
    };

    loadMoreCards = () => {
        let skip = this.state.skip + this.state.limit; // 数据库不是从0开始取， 从6开始

        this.props.dispatch(getJobPosting(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.user.jobs
        )).then(() => {
            this.setState({
                skip
            })
        })
    };

    handleGrid = () => {
        this.setState({
            grid: !this.state.grid ? 'grid_bars' : ''
        })
    };


    render() {

        const jobs = this.props.user;
        return (
            <div>
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckbox
                                initState={true}
                                title="Job Title"
                                list={this.state.initials.tag}
                                handleFilters={(filters) => this.handleFilters(filters, 'tag')}
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Locations"
                                list={this.state.initials.locations}
                                handleFilters={(filters) => this.handleFilters(filters, 'location')}
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Saved"
                                list={this.state.initials.isSaved}
                                handleFilters={(filters) => this.handleFilters(filters, 'isSaved')}
                            />
                        </div>

                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    <div
                                        className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faTh}/>
                                    </div>
                                    <div
                                        className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faBars}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <LoadMoreCards
                                    grid={this.state.grid}
                                    limit={this.state.limit}
                                    size={jobs.size}
                                    products={jobs.jobs}
                                    loadMore={() => this.loadMoreCards()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(Jobs);