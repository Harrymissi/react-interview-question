import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {findJobById, editJob} from '../../../actions/userActions';
import TextFieldGroup from '../../utils/form/TextFileldGroup';
import TextAreaFieldGroup from '../../utils/form/TextAreaFieldGroup';
import Dialog from '@material-ui/core/Dialog';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            company: '',
            location: '',
            summary: '',
            success: false
        };

    }

    componentDidMount() {
        console.log(window.location.href.split('/')[4]);
        this.props.dispatch(findJobById(window.location.href.split('/')[4]));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user.currentJob !== nextProps.user.currentJob) {
            this.setState({
                title: nextProps.user.currentJob.title,
                company: nextProps.user.currentJob.company,
                location: nextProps.user.currentJob.location,
                summary: nextProps.user.currentJob.summary
            })
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const id = window.location.href.split('/')[4];
        const profileData = {
            tag: this.state.title,
            company: this.state.company,
            location: this.state.location,
            summary: this.state.summary
        };

        this.props.dispatch(editJob(id, profileData))
            .then(response => {
                if (response) {
                    this.setState({success: true});
                    setTimeout(() => {
                        this.props.history.push('/jobs')
                    }, 1500)
                }
            });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Edit Profile</h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="tag"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    info="Job Title for this post"
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    info="Could be your own company or one you work for"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    info="City or city & state suggested (eg. Boston, MA)"
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="summary"
                                    value={this.state.summary}
                                    onChange={this.onChange}
                                    info="Tell us a little about yourself"
                                />

                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <Dialog open={this.state.success}>
                    <div className="dialog_alert">
                        <div>Edit Successfully !!</div>
                        <div>
                            You will be redirected to the Job List Page in a couple seconds...
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});


export default connect(mapStateToProps)(
    withRouter(CreateProfile)
);
