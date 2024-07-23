let host_url = "http://localhost";
const port = ':3000'
const url = host_url + port;

export const environment = {
    production: false,
    user: {
        signup: url + '/signup',
        auth: url + '/auth',
        like: url + '/user/like/idea',
        votes: url + '/user/vote'
    },
    idea:{
        idea: url + '/idea',
        comment: url + '/idea/comment'
    }
};
