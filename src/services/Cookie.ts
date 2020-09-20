export class Cookie {

    static exist(key: string): boolean {
        return Cookie.read(key) != '';
    }

    static read(key: string): string | undefined {
        var b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : '';
    }

    // static read(key: string): string | null {
    //     const cookies: string = document.cookie;
    //     const prefix = key + "=";
    //     let begin = cookies.indexOf("; " + prefix);
    //     let end = -1;
    //     if (begin === -1) {
    //         begin = cookies.indexOf(prefix);
    //         if (begin !== 0) return null;
    //     } else {
    //         begin += 2;
    //         end = document.cookie.indexOf(";", begin);
    //         if (end === -1) {
    //             end = cookies.length;
    //         }
    //     }
    //     return decodeURI(cookies.substring(begin + prefix.length, end));
    // }

    static write(key: string, value: string, expireDate: Date): void {
        document.cookie = `${key}=${value}; expires=${expireDate.toUTCString()}`;
    }

    static remove(key: string) {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

}