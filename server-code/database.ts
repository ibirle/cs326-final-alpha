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
            console.log(res);
        })();
    }

    public async getAllCurrentChallengesQuery() : Promise<Object> {
        return this.client.query("SELECT * FROM competition").catch(err => { console.log(err);});
    }
    
    public async getChallenge(key: string, value: string) : Promise<Object> {
        this.client.query("SELECT * FROM competition WHERE competition_id = '" + key + "'", (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
        return {};
    }

    public async getEntries(key: string, value: string) : Promise<Object> {
        this.client.query('SELECT * FROM entry;', (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
        return {};
    }

    public async submitEntry(key: string, value: string) : Promise<Object> {
        this.client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
        return {};
    }

    public async getEntryPictures(key: string, value: string) : Promise<Object> {
        this.client.query('SELECT * FROM entryimage;', (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
        return {};
    }

    public async voteFor(key: string, value: string) : Promise<Object> {
        this.client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
        return {};
    }

    public async getVoteTotal(key: string) : Promise<Object> {
        this.client.query('SELECT COUNT(*) AS votetotal FROM vote WHERE competition_id =' + key + ";", (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
        return {};
    }

    public async getAccount(key: string) : Promise<Object> {
        this.client.query("SELECT * FROM entry WHERE user_id = " + key + ";", (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
        return {};
    }
}
