import * as SignalR from '@aspnet/signalr';

export const connection = new SignalR.HubConnectionBuilder()
    .withUrl(process.env.REACT_APP_SIGNALR_URL)
    .configureLogging(SignalR.LogLevel.Information)
    .build();

export const startConnection = () => {
    connection.start()
    .then(() => {
    }).catch(err => console.error(err.toString())) 
}

export const onConnectionClosed = () => {
    connection.onclose((e) => {
        startConnection()
    })
}

export const updateChat = (data) => {
    connection.invoke('UpdateChat', data)
        .catch(err => console.error(err));
}

