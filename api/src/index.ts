import { db,initTable } from "./database/database";
import Fastify from "fastify";
import cors from "@fastify/cors";


initTable();

const fastify = Fastify();
fastify.register(cors);


type film = {
    titre : string,
    realisateur : string,
    annee : string
}

fastify.post("/film",(request,reply) =>{
    const {titre , realisateur, annee} = request.body as film;
    const query = db.prepare("INSERT INTO `film`(titre,realisateur,annee) VALUES(?,?,?)")
    const result = query.run(titre,realisateur,annee);
    if (result){
        reply.code(200);
        
    }
})


fastify.get("/film",(request,reply) =>{
    const query = db.prepare("SELECT * from `film`")
    const result = query.all();
    if (result){
        reply.send(result);
    }  
})



type Searchparam = {
    text : string
}


fastify.get("/film/:text",(request,reply)=>{
    const {text} = request.params as Searchparam;
    const search = `%${text}%`;
    const query = db.prepare("SELECT * FROM `film` WHERE titre LIKE ? OR realisateur LIKE ? OR annee LIKE ?");
    const result = query.all(search,search,search);
    if(result){
        reply.send(result);

    }
    




})














fastify.listen({port : 8080});
