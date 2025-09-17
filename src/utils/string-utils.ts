export class StringUtils {
    
    public static isNullOrEmpty(val: string) : boolean {
        if (val == null || val.trim() === '') return true;
        return false;
    };

    public static onlyNumbers(number: string) : string {
        return number.replace(/\D/g,'');
    }

    public static dateToProtheusFormat(date: Date | string): string {
        if(date) {
            const temp = new Date(date);
            return temp.toISOString().split("T")[0].replace(/-/g, "")
        }
        return "null";
    }

   /*  public static toQueryStringFiltered<T>(obj: T, override: { [key: string]: string } | { [key in keyof T]: string } = null): string {
        if (obj) {
            return this.buildQueryString(
                Object.entries(obj).filter(entry => entry[1] != null && entry[1] !== ''), 
                override
            );
        }
        return "";
    } */
    
    private static buildQueryString(entries: [string, any][], override: { [key: string]: string } | { [key in keyof any]: string }): string {
        const queryString = entries.map(([key, value]) => {
            if (Array.isArray(value)) {
                return this.buildArrayQueryString(key, value, override);
            }
            if (override && override[key]) {
                key = override[key];
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }).join('&');
        return queryString;
    }
    
    private static buildArrayQueryString(key: string, array: any[], override: { [key: string]: string } | { [key in keyof any]: string }): string {
        if (override && override[key]) {
            key = override[key];
        }
        return array.map(item => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`).join('&');
    }
    

    public static padLeft(value: number | string, pad: number = 2, padWith: string = "0") {
        return value.toString().padStart(pad, padWith);
    }
    public static padRight(value: number | string, pad: number = 2, padWith: string = "0") {
        return value.toString().padEnd(pad, padWith);
    }
}

