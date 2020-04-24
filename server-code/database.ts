const { Client } = require('pg');

export class Database {

    private client;

    constructor() {

        console.log(process.env.DATABASE_URL);

        this.client = new Client({
            connectionString: process.env.DATABASE_URL || "postgres://tjtawurzxcjeno:f63354efa372eef52c19d18a6101f0e573a3fc225f8e39a6ccb9bf7f44324b33@ec2-54-152-175-141.compute-1.amazonaws.com:5432/dah746ou0eons",
            ssl: true,
        });

        (async () => {
            await this.client.connect().catch(err => { console.log(err); });
            let res = await this.client.query("SET search_path TO 'prod'").catch(err => { console.log(err); });
        })();
    }

    public async getAllCurrentChallengesQuery() : Promise<Object> { //get all challenges from competition table
        return this.client.query("SELECT * FROM competition").catch(err => { console.log(err);});
    }
    
<<<<<<< HEAD
    public async getChallengeQuery(challengeID: number) : Promise<Object> {
        return this.client.query("SELECT * FROM competition WHERE 'competition_ID' = $1", [challengeID] ).catch(err => { console.log(err);});
=======
    public async getChallenge(key: string) : Promise<Object> { // get a challenge from competition table given a competition id
        return this.client.query("SELECT * FROM competition WHERE competition_id = " + key + ";", (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
    }

    public async getEntries(key: string) : Promise<Object> { // get all entries for a given competition, key is competition id
        return this.client.query("SELECT * FROM entry WHERE competition_id = " + key + ";", (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
    }

    public async submitEtry(key: string) : Promise<Object> { // sumbit entry into entry table, key is entry 
        return this.client.query("INSERT INTO entry VALUES ('" + key + "';", (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
        //note it will only return an the json if submission was successful
    }

    public async getEntryPictures(key: string) : Promise<Object> { // get all images for entry_image table where is entry id
        return this.client.query('SELECT * FROM entryimage WHERE entry_id =' + key + ";", (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
    }

    public async voteFor(key: string, value: string) : Promise<Object> {// insert a new row into vote row where key is competition id, value is vote information
        let obj = key + ', ' + value;
        return this.client.query("INSERT INTO vote VALUES ('" + obj + "');", (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
    }

    public async getVoteTotal(key: string) : Promise<Object> { // gets total votes of a entry where key is entry id 
        return this.client.query('SELECT COUNT(*) AS votetotal FROM vote WHERE entry_id =' + key + ";", (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
    }

    public async getAccount(key: string) : Promise<Object> { // get accounts, key is user id
        return this.client.query("SELECT * FROM user WHERE user_id = " + key + ";", (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
>>>>>>> af9481a12c4e6baadf7aa24f6c55999de7f07407
    }
}
