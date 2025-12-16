declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    DATABASE_URL: string;
    NODE_ENV: string;
  }
}
