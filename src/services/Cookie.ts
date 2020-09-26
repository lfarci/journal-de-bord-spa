export class Cookie {

    static exist(key: string): boolean {
        return Cookie.read(key) !== '';
    }

    static read(key: string): string | undefined {
        var b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : '';
    }

    static write(key: string, value: string, expireDate: Date): void {
        document.cookie = `${key}=${value}; expires=${expireDate.toUTCString()}`;
    }

    static remove(key: string) {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

}