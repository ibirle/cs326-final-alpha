const { Client } = require('pg');

export class Database {

    private client;

    constructor() {

        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        });

        (async () => {
            await this.client.connect().catch(err => { console.log(err); });
        })();
    }

    public async getAllCurrentChallengesQuery() : Promise<Object> {
        console.log("Here");
        return this.client.query('SELECT * FROM COMPETITION;').catch(console.log("error with query"));
    }
    
    public async getChallenge(key: string, value: string) : Promise<Object> {
        this.client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
        return {};
    }

    public async getEntries(key: string, value: string) : Promise<Object> {
        this.client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
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
        this.client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
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

    public async getVoteTotal(key: string, value: string) : Promise<Object> {
        this.client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
        return {};
    }

}
