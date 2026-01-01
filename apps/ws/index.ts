import { prisma } from 'db/client';


Bun.serve({
    port :8081,
    fetch(req,server){
        if(server.upgrade(req)){
            return;
        }
        return new Response("WebSocket server is running"); 
    },
    websocket:{
        message(ws,msg){
            prisma.user.create({
                data:{
                    name: Math.random().toString(36).substring(7),
                    email: `${Math.random().toString(36).substring(7)}@example.com`,
                    password: 'password123' // Required by your schema
                }
            });
            ws.send(`Message received: ${msg}`);
        }
    }
})