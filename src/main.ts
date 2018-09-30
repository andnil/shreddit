import { Shreddit } from "./shreddit";
import * as dotenv from "dotenv";

class Startup {
    public static async run(): Promise<void> {
        dotenv.config();
        const shreddit = new Shreddit();
        const posts = await shreddit.getNew();

        for(const post of posts){
            console.log(post.title)
        }
    }
}

Startup.run();