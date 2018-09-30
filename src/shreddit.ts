import axios, { AxiosRequestConfig } from 'axios';
import querystring from 'querystring';

class Shreddit {
    private accessToken: string

    public async getNew() : Promise<Set<Post>>{
        const posts = new Set<Post>();

        const requestConfig : AxiosRequestConfig = {
            headers: {
                Authorization: 'Bearer '.concat(this.accessToken || await this.getAccessToken())
              }
        };

        const result = await axios.get('https://oauth.reddit.com/r/metal/new', requestConfig);
        for (const entry of result.data.data.children) {
            posts.add(new Post(entry.data.title));
        }

        return posts;
    }

    private async getAccessToken() : Promise<string> {
        const accessTokenRequestConfig : AxiosRequestConfig = {
            auth: {
                username: process.env.CLIENT_ID,
                password: process.env.CLIENT_SECRET
            }
        };

        const accessTokenRequest = await axios.post('https://www.reddit.com/api/v1/access_token', 
        querystring.stringify({
            grant_type: 'password',
            username: process.env.REDDIT_USER,
            password: process.env.REDDIT_PASS,
        }), accessTokenRequestConfig);

        return accessTokenRequest.data.access_token;
    }
}

class Post {
    title: string;
    constructor(title: string){
        this.title = title;
    }
}

export { Shreddit };