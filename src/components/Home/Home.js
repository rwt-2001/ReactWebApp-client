import React from 'react'
import { Grow, Container, Grid, Paper } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Forms/Form";
import { getPosts } from '../../actions/posts';
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import PaginateItem from '../Pagination/Pagination';
const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentId])
    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignment="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
export default Home;