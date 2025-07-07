// TaskFlow API v0.1 - Serveur Hello World

import {serve} from "@hono/node-server";
import {Hono} from "hono";


// Creer une instance de Hono
const app = new Hono();

// Route pour la racine
app.get("/", (c) => {
    // c = Context Object ( Contient de la requete et de la reponse )
    return c.text("Bienvenue sur TaskFlow API v0.1");
} );


// Route pour /hello avec un parametre name optionnel
app.get("/hello/:name?", (c) => {
    // Recuperer le parametre name de la requete
    const name = c.req.param("name") || "Falcon Heavy";
    return c.text(`Hello ${name}!`);
});


// Route qui retourne un JSON
app.get("/api/info", (c) => { 
    return c.json({
        name: "TaskFlow API",
        version: "0.1",
        status: "running",
        description: "API de gestion de flux de tâches",
        timeStamp: new Date().toISOString(),
     });
});


// Exo, ajouter un endpoint qui retourne la version de l'API
app.get("/api/version", (context) => { 
    return  context.json({
        "major": 0,
        "minor": 1,
        "patch": 0
    })
})


// Demarrage du server
const port = 3000; 
console.log(`Démarrage du serveur sur le port ${port}...`);

serve({ 
    fetch: app.fetch,
    port: port,

})


