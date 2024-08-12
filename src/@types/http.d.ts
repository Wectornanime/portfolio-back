declare module 'http' {
    interface IncomingHttpHeaders extends NodeJS.Dict<string | string[]> {
        'token'?: string | undefined;
    }
}
