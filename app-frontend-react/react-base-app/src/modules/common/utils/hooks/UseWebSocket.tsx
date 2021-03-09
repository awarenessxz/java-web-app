import { useEffect, useRef, useState } from 'react';
import { Client, Frame } from '@stomp/stompjs';

const useWebSocket = (brokerUrl: string): [Client | null, boolean] => {
    const stompClient = useRef<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // connect web socket
        const stompConfig = {
            brokerURL: brokerUrl,
            debug: (str: string): void => {
                console.log(str);
            },
            onConnect: (frame: Frame): void => {
                console.log('Web Socket Connected');
                setIsConnected(true);
            },
            onStompError: (frame: Frame): void => {
                console.log(`Broker reported error: ${frame.headers.message}`);
                console.log(`Additional Details: ${frame.body}`);
            },
            reconnectDelay: 100000000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        };
        stompClient.current = new Client(stompConfig);
        stompClient.current.activate();

        return (): void => {
            if (stompClient && stompClient.current) {
                // eslint-disable-next-line no-void
                void stompClient.current.deactivate();
                console.log('Web Socket Connection is Closed');
                setIsConnected(false);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [stompClient.current, isConnected];
};

export default useWebSocket;
