import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://103.90.86.173:5293/notificationHub", {
        // यदि तपाइँको Hub मा [Authorize] छ भने यहाँ टोकन पठाउनुहोस्
        accessTokenFactory: () => localStorage.getItem("token")
    })
    .withAutomaticReconnect()
    .build();

export const startConnection = async () => {
    try {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
            await connection.start();
            console.log("SignalR Connected!");
        }
    } catch (err) {
        console.error("SignalR Connection Error: ", err);
        setTimeout(startConnection, 5000);
    }
};

export default connection;