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
        })();
    }

    public async getAllCurrentChallengesQuery() : Promise<Object> {
        console.log("Here");
        return this.client.query('select * from prod.competition').catch(err => { console.log(err); });
    }
}
