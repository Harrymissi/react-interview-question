import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const MyButton = (props) => {

    const buttons = () => {
        let template = '';

        switch(props.type){
            case "default":
                template = <Link
                    className={!props.altClass ? 'link_default' : props.altClass}
                    to={props.linkTo}
                    {...props.addStyles}
                >
                    {props.title}
                </Link>;
                break;
            case "bag_link":
                template =
                    <div
                        className="bag_link"
                        onClick={() => {props.runAction()}}
                    >
                        {
                            props.job.isSaved ?
                                <FontAwesomeIcon
                                    icon={faCheck}
                                />
                                :
                                <FontAwesomeIcon
                                    icon={faSmile}
                                />
                        }

                    </div>;
                break;
            case "delete":
                template =
                    <div
                        className="bag_link"
                        onClick={() => {props.runAction()}}
                    >
                        {
                            props.job.isDeleted ?
                                null
                                :
                                <FontAwesomeIcon
                                    icon={faTimes}
                                />
                        }

                    </div>;
                break;
            default:
                template='';
        }
        return template
    };


    return (
        <div className="my_link">
            {buttons()}
        </div>
    );
};

export default MyButton;