class AnalyticalMaterialsObj {
    title: string;
    date: Date;
    source: string;
    imageUrl: string;
    lead: string;
    text: string;

    constructor(title: string, date: Date, source: string,  imageUrl: string, lead: string, text: string) {
        this.title = title;
        this.date = date;
        this.source = source;
        this.imageUrl = imageUrl;
        this.lead = lead;
        this.text = text;
    }

    disp(): void {
        console.log(`Title: ${this.title}, Date: ${this.date}, Source: ${this.source}, ImageUrl: ${this.imageUrl}, Lead: ${this.lead},  Text: ${this.text}`)
    }

}

class dayPhotosObj {
    imageUrl: string;
    date: Date;
    source: string;
    
    constructor(imageUrl: string, date: Date, source: string) {
        this.imageUrl = imageUrl;
        this.date = date;
        this.source = source;
    }

    disp(): void {
        console.log(`ImageUrl: ${this.imageUrl}, Date: ${this.date}, Source: ${this.source}`)
    }

}

class leaderInterviewsObj {
    title: string;
    date: Date;
    videoUrl: string;

    constructor(title: string, date: Date, videoUrl: string) {
        this.title = title;
        this.date = date;
        this.videoUrl = videoUrl;
    }

    disp(): void {
        console.log(`Title: ${this.title}, Date: ${this.date}, VideoUrl: ${this.videoUrl}`)
    }
}

class warHistoryObj {
    title: string;
    date: Date;
    videoUrl: string;

    constructor(title: string, date: Date, videoUrl: string) {
        this.title = title;
        this.date = date;
        this.videoUrl = videoUrl;
    }

    disp(): void {
        console.log(`Title: ${this.title}, Date: ${this.date}, VideoUrl: ${this.videoUrl}`)
    }
}

class worldAboutUkraineObj {
    title: string;
    date: Date;
    source: string;
    sourceUrl: string;
    imageUrl: string;
    lead: string;

    constructor(title: string, date: Date, source: string, sourceUrl: string, imageUrl: string, lead: string) {
        this.title = title;
        this.date = date;
        this.source = source;
        this.sourceUrl = sourceUrl;
        this.imageUrl = imageUrl;
        this.lead = lead;
    }

    disp(): void {
        console.log(`Title: ${this.title}, Date: ${this.date}, Source: ${this.source}, SourceUrl: ${this.sourceUrl}, ImageUrl: ${this.imageUrl}, Lead: ${this.lead}`)
    }
}

export { AnalyticalMaterialsObj, dayPhotosObj, leaderInterviewsObj, warHistoryObj, worldAboutUkraineObj }