const { Client } = require('pg');

export class Database {

    private client;

    constructor() {

        console.log(process.env.DATABASE_URL);

        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
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
    
    public async getChallengeQuery(challengeID: number) : Promise<Object> {
        return this.client.query("SELECT * FROM competition WHERE 'competition_ID' = $1", [challengeID] ).catch(err => { console.log(err);});
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
    }
    public async submiComment(key: string) : Promise<Object> { // sumbit comment into comment table, key is comment 
        return this.client.query("INSERT INTO comment VALUES ('" + key + "';", (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
    }
}
