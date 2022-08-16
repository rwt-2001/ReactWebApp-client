import React, { useState, useEffect } from 'react'
import useStyles from './styles';
import FireBase from 'react-file-base64'
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import { createPost, updatePost } from '../../actions/posts';
import { useSelector, useDispatch } from 'react-redux';

const Form = ({ currentId, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const classes = useStyles();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });

    useEffect(() => {

        if (post) {
            setPostData(post);

        }
    }, [currentId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));

            setCurrentId(null);
            clearForm();
        }
        else {

            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clearForm();

        }

    }

    const setValuesOnChange = (event) => {
        const { name, value } = event.target;

        setPostData(preValue => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const clearForm = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        });

    }
    if (!user?.result?.name) {
        return <Paper className={classes.paper}>
            <Typography>Please Sign In First</Typography>
        </Paper>
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={(event) => handleSubmit(event)}>
                <Typography variant='h6'> {currentId ? "Update" : "Share A"} Post</Typography>
                <TextField
                    name='title'
                    variant='outlined'
                    label='Title'
                    fullWidth
                    value={postData.title}
                    onChange={(e) => { setValuesOnChange(e) }} />
                <TextField
                    name='message'
                    variant='outlined'
                    label='Message'
                    fullWidth
                    value={postData.message}
                    onChange={(e) => { setValuesOnChange(e) }} />

                <TextField
                    name='tags'
                    variant='outlined'
                    label='Tag'
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => { setPostData({ ...postData, tags: e.target.value.split(',') }) }} />

                <div className={classes.fileInput}>
                    <FireBase
                        type='file'
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' sz='large' type='submit' fullWidth> SUbmit </Button>
                <Button className={classes.buttonSubmit} variant='contained' color='secondary' sz='large' onClick={clearForm} fullWidth> Clear </Button>
            </form>

        </Paper>
    )
}

export default Form;