import React, {Component} from 'react';
import {connect} from 'react-redux';
import MyButton from "../../utils/MyButton";
import {saveJobs, unSaveJobs, deleteJob} from '../../../actions/userActions';

class Card extends Component {

    render() {
        const props = this.props;
        return (
            <div className={`card_item_wrapper ${props.grid}`}>
                <div className="action_container">
                    <div className="button_wrapp">
                        <MyButton
                            type="delete"
                            job={props}
                            runAction={() => {
                                this.props.dispatch(deleteJob(props._id))
                            }}
                        />
                    </div>
                    <div className="tags">
                        <div className="brand">{props.title}</div>
                        <div className="name">{props.company}</div>
                        <div className="price">{props.location}</div>
                    </div>

                    {
                        props.grid ?
                            <div className="description">
                                <p>{props.summary}</p>
                            </div>
                            : null
                    }
                    <div className="actions">
                        <div className="button_wrapp">
                            <MyButton
                                type="default"
                                altClass="card_link"
                                title="edit"
                                linkTo={`/job_detail/${props._id}`}
                                addStyles={{
                                    margin: '10px 0 0 0'
                                }}
                            />
                        </div>
                        <div className="button_wrapp">
                            <MyButton
                                type="bag_link"
                                job={props}
                                runAction={() => {
                                    props && props.isSaved ?
                                        this.props.dispatch(unSaveJobs(props._id)) : this.props.dispatch(saveJobs(props._id))
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Card);