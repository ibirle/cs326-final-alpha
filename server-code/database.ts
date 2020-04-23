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
}
