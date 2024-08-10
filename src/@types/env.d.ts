declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        PORT: string;
        SECRET_KEY: string;
        // Adicione aqui outras variáveis de ambiente que você usa
    }
}
