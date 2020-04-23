export class Database {

    constructor() {

        (async () => {
            await this.client.connect().catch(err => { console.log(err); });
        })();
    }

    public async getAllCurrentChallenges(key: string, value: string) : Promise<Object> {
        return {};
    }

}
