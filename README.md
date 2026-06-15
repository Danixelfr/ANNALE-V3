Actions à faire : 

d'abord faire le front / tester

créer dossier api => créer dossier src dans api => install typescript ==> initialiser : npx tsc --init ==> modif config json ==> créer un fichier index.ts et tester

DATABASE :
install dans api : better-sqlite3 puis @types/better-sqlite3 en -D

créer dossier database puis dedans fichier database.ts.
EXEMPLE FICHIER DB :

import Database from "better-sqlite3";

export const db = new Database('film.sqlite', { verbose: console.log });
console.log("base de donnée connecté avec succes");


export const initTable =(): void => {
    const query =`
        CREATE TABLE IF NOT EXISTS film (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titre TEXT NOT NULL,
            realisateur TEXT NOT NULL,
            annee TEXT NOT NULL,
             genre_id INTEGER REFERENCES genre(id)
        )
    `;
        
    db.exec(query);
    db.exec(`
        CREATE TABLE IF NOT EXISTS genre (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL UNIQUE
        )


        
        
        
        `)
        
}

POUR L'UTILISER : 

dans index.ts : 

import { db,initTable } from "./database/database";
initTable();

INSTALLER FASTIFY :

npm i fastify
et @fastify/cors

import :

import Fastify from "fastify";
import cors from "@fastify/cors";


le créer : 
const fastify = Fastify();
fastify.register(cors);
