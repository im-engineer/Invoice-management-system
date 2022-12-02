const config = {
    local : {

    },
    staging : {
        DB : {
            HOST : "172.10.1.3",
            PORT : 27017,
            DBNAME : "siddhantsingh",
            USERNAME : "siddhantsingh",
            PASSWORD : "siddhantsingh87"
        },
        port_no : 3456,
        Email : {
            host : "smtp.gmail.com",
            port : 465,
            user : "azmsiddhant1@gmail.com",
            password : "khghxqhczbsezjtd"
        }
    },
    production : {

    }
}
export const get =  (env) => {
    return config[env];
}