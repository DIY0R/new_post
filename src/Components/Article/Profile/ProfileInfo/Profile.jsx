import React, { useState } from "react"
import styles from "./Profile.module.css"
import likes from "../../../additional/like.png"
import dislikes from "../../../additional/dislike.png"
import { Field, Form, reduxForm } from "redux-form"
import Loader from "../../../../loader/Loader"
import { CraeteFildValidation } from "../../../FieldLevelValidationForm/FieldLevelValidationForm"
// import ProfileStatus from "../ProfileStatus/ProfileNewStatus"
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    root: {
        // display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
}))
const Profile = props => {

    const classes = useStyles()
    const [likeSet, addLike] = useState(false)
    const [edite, deEditeMode] = useState(false)
    let values = props.ProfilePost.post
    const OnAdd = values => {
        if (values.text) {
            props.addPost(values.text)
        }
    }
    if (!props.profile) {
        return <Loader />
    }

    const onFiles = e => {
        if (e.target.files.length) {
            props.ProfilePhoto(e.target.files[0])
        }
    }
    const onSubmitInfo = (info) => {
        // console.log();
        props.SaveProfile(info).then(() => {
            deEditeMode(false)
        })
    }
    return (
        <div className={styles.grid}>
            <div>
                Name : ~{props.profile.fullName}~ <Avatar
                    src={props.profile.photos.large}
                    className={classes.large} />
                <br />
                {props.isOwner &&
                    <span>

                        <input accept=".jpg, .jpeg, .png" type="file"
                            onChange={onFiles} />

                    </span>}
            </div>
            <div>

                {edite ?
                    <ProfileFormData initialValues={props.profile} profile={props.profile} onSubmit={onSubmitInfo} /> :
                    <DataProfile goToEditeMode={() => {
                        deEditeMode(true)
                    }} isLoader={props.isLoader} isOwner={props.isOwner} profile={props.profile} />}
            </div>
            <div>
                <ProfilePostForm onSubmit={OnAdd} /> <br />
                {values.map(post => (
                    <div key={post.id} className={styles.datas}>
                        <img src={post.img} alt="" />
                        <br />
                        <strong>{post.text}</strong> <br />

                        <div className={styles.like}>
                            {post.like ? (
                                <input

                                    type="image"
                                    onClick={(event) => {
                                        props.setLike(post.id)
                                        // console.log()
                                    }}
                                    src={likes}
                                    alt="like"
                                />
                            ) : (
                                <input
                                    type="image"
                                    disabled={false}
                                    onClick={() => {
                                        props.setLike(post.id)
                                    }}
                                    src={dislikes}
                                    alt="disLike"
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

const ProfileForm = props => {
    return (
        <p>
            <Form onSubmit={props.handleSubmit}>
                <Field name={"text"} component={"textarea"} value={"hello"} />
                <button>add</button>
            </Form>
        </p>
    )
}
const ProfilePostForm = reduxForm({ form: "profile" })(ProfileForm)

const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div>
            <b>{contactTitle} </b>:{contactValue}
        </div>
    )
}

const DataProfile = props => {
    return (

        <div>

            <div><strong>About me : </strong>
                {props.profile.aboutMe} <br />
                <strong>Contacts</strong>:
                {Object.keys(props.profile.contacts).map(key => {
                    return (
                        <Contact
                            key={key}
                            contactTitle={key}
                            contactValue={props.profile.contacts[key]}
                        />
                    )
                })}
                <strong>looking For AJob:</strong>
                {props.profile.lookingForAJob ? "yes" : "no"} <br />
                <strong>looking For a Job Description:</strong>
                {props.profile.lookingForAJobDescription}</div>

            {props.isOwner && <button onClick={props.goToEditeMode} className={styles.buttonType}>Edite</button>}
        </div>
    )
}

const ProfileFormPut = (props) => {

    return (
        <Form onSubmit={props.handleSubmit}>


            <div>{props.error && <div className={styles.errorProfle}>
                {props.error}
            </div>}</div>
            <Field component={CraeteFildValidation} name={'aboutMe'} placeholder={'About me'} />
            <div className={styles.contacts}>{Object.keys(props.profile.contacts).map(key => {
                return (
                    <div><b>{key}:{<Field key={key} name={'contacts.' + key} component={'input'} />}</b></div>
                )
            })}</div>
            <Field component={'input'} name={'lookingForAJob'} placeholder={'looking For a Job'} type={'checkbox'} />
            <br />
            <Field component={'input'} name={'lookingForAJobDescription'}
                placeholder={'looking for a job Description'} /><br />
            <Field component={'input'} name={'fullName'} placeholder={'Full name'} /> <br />

            <button className={styles.buttonType}>Save</button>
        </Form>
    )
}
const ProfileFormData = reduxForm({ form: 'fromData' })(ProfileFormPut)
export default Profile
