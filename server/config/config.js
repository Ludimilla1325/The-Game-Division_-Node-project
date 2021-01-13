const config = {
    production:{
        SECRET:process.env.SECRET,
        DATABASE:process.env_MONGODB_URI,
        PORT:process.env.PORT
    },
    default:{
        SECRET:'nunewiucnweimqke',
        DATABASE:"mongodb://localhost:27017/tgd_app", //{ useNewUrlParser: true }, { useUnifiedTopology: true }),
        PORT:3000
    }
}
exports.get = function get(env){
    return config[env] || config.default
}