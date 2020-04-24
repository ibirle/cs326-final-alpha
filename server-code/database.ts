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

    public async getAllCurrentChallengesQuery() : Promise<Object> {
        return this.client.query("SELECT * FROM competition").catch(err => { console.log(err);});
    }
    
    public async getChallengeQuery(challengeID: number) : Promise<Object> {
        return this.client.query("SELECT * FROM competition WHERE 'competition_ID' = $1", [challengeID] ).catch(err => { console.log(err);});
    }
}
