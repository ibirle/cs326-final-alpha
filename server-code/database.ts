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

    public async getChallengeVoteQuery(user_ID: string, competition_ID: string) {
        return this.client.query('SELECT * FROM vote WHERE "competition_ID" = $1 AND "user_ID" = $2;', [competition_ID, user_ID] ).catch(err => { console.log(err);});
    }

    public async getAllCurrentChallengesQuery() : Promise<Object> { //get all challenges from competition table
        return this.client.query("SELECT * FROM competition").catch(err => { console.log(err);});
    }
    
    public async getChallengeQuery(challengeID: string) : Promise<Object> {
        return this.client.query('SELECT * FROM competition WHERE "competition_ID" = $1;', [challengeID] ).catch(err => { console.log(err);});
    }

    public async postChallengeQuery(recipe_desc, recipe_link, competition_name, start_time, end_time, cover_link, detail_link, competition_type) : Promise<Object> {
        return this.client.query("INSERT INTO competition (recipe_desc, recipe_link, competition_name, start_time, end_time, cover_link, detail_link, competition_type) VALUES($1, $2, $3, $4, $5, $6, $7, $8);",
        [recipe_desc, recipe_link, competition_name, start_time, end_time, cover_link, detail_link, competition_type] ).catch(err => { console.log(err);});
    }

    public async getEntriesQuery(challengeID: string) : Promise<Object> { // get all entries for a given competition, key is competition id
        return this.client.query('SELECT * FROM entry WHERE "competition_ID" = $1;', [challengeID] ).catch(err => { console.log(err);});
    }

    public async submitEntryQuery(user_ID, competition_ID, urls) : Promise<Object> { // sumbit entry into entry table, key is entry 
        return this.client.query('INSERT INTO entry("user_ID", "competition_ID", entry_pics) VALUES($1, $2, $3);', [user_ID, competition_ID, urls]).catch(err => { console.log(err);});
    }

    public async getEntryPictures(key: string) : Promise<Object> { // get all images for entry_image table where is entry id
        return this.client.query('SELECT * FROM entryimage WHERE entry_id =' + key + ";", (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
    }

    public async voteForQuery(user_ID: string, competition_ID: string, entry_ID: string) : Promise<Object> {// insert a new row into vote row where key is competition id, value is vote information
        return this.client.query('INSERT INTO vote("competition_ID", "entry_ID", "user_ID") VALUES($1, $2, $3) ON conflict ("competition_ID", "user_ID") DO update set "entry_ID" = $2 where prod.vote."competition_ID" = $1 and prod.vote."user_ID" = $3;', [competition_ID, entry_ID, user_ID]).catch(err => { console.log(err);});
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

    public async submitCommentQuery(content, competition_ID, user_ID) : Promise<Object> { // sumbit comment into comment table, key is comment 
        return this.client.query('INSERT INTO comment("content", "competition_ID", "user_ID") VALUES($1, $2, $3);', [content, competition_ID, user_ID]).catch(err => { console.log(err);});
    }

    public async getCommentsQuery(competition_ID) : Promise<Object> { // sumbit comment into comment table, key is comment 
        return this.client.query('SELECT * FROM prod.comment INNER JOIN prod.user on prod.comment."user_ID" = prod.user."user_ID" WHERE "competition_ID" = $1;', [competition_ID]).catch(err => { console.log(err);});
    }
}
