let host_url = "http://localhost";
const port = ':3000'
const url = host_url + port;

export const environment = {
    production: false,
    user: {
        signup: url + '/signup',
        auth: url + '/auth'
    },
    idea:{
        idea: url + '/idea'
    }
};
