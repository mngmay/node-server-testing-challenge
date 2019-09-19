// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      directory: "./data/breads.db3"
    },
    migrations: {
      directory: "./data/migrations"
    }
  }
};
