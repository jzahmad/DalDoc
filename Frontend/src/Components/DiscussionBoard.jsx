import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
import { useAuth } from "./context";

export default function DiscussionBoard() {
    const { url } = useAuth();
    const { department } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        // Create and configure the SignalR connection
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${url}/chatHub`)
            .withAutomaticReconnect()
            .build();

        newConnection.on('ReceiveComment', (comment) => {
            setComments(prevComments => [...prevComments, comment]);
        });

        newConnection.on('LoadChatHistory', (history) => {
            setComments(history);
        });

        newConnection.on('ReceiveError', (error) => {
            console.error('Error:', error);
        });

        newConnection.start()
            .then(() => {
                setConnection(newConnection);
                // Join the chat room when the connection is established
                newConnection.invoke('JoinRoom', department)
                    .catch(err => console.error('Error joining room:', err));
            })
            .catch(err => console.error('Connection error:', err));

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, [department, url]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;

        try {
            await connection.invoke('SendComment', department, newComment);
            setNewComment('');
        } catch (error) {
            console.error('Failed to send comment:', error);
        }
    };

    return (
        <div style={styles.discussionBoardContainer}>
            <h2 style={styles.departmentHeading}>{department} Discussion Board</h2>
            <List style={styles.commentsList}>
                {comments.map((comment, index) => (
                    <ListItem key={index} style={styles.commentListItem}>
                        <Card style={styles.commentCard}>
                            <ListItemText primary={comment} />
                        </Card>
                    </ListItem>
                ))}
            </List>
            <form onSubmit={handleSubmit} style={styles.commentForm}>
                <TextField
                    placeholder="Start a discussion"
                    variant="outlined"
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                    style={styles.commentInput}
                />
                <Button type="submit" variant="contained" style={styles.postButton}>Post</Button>
            </form>
        </div>
    );
}

const styles = {
    discussionBoardContainer: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    departmentHeading: {
        marginBottom: '20px',
        fontSize: '24px',
    },
    commentsList: {
        width: '100%',
    },
    commentListItem: {
        marginBottom: '10px',
    },
    commentCard: {
        padding: '15px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
    },
    commentForm: {
        display: 'flex',
        alignItems: 'center',
    },
    commentInput: {
        width: 'calc(100% - 100px)',
        marginRight: '10px',
        backgroundColor: 'white'
    },
    postButton: {
        height: '56px',
    },
};
