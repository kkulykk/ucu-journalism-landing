class AnalyticalMaterialsObj {
  title: string;
  date: any;
  source: string;
  imageUrl: string;
  lead: string;
  text: string;

  constructor(
    title: string,
    date: any,
    source: string,
    imageUrl: string,
    lead: string,
    text: string
  ) {
    this.title = title;
    this.date = date.toDate().toDateString();
    this.source = source;
    this.imageUrl = imageUrl;
    this.lead = lead;
    this.text = text;
  }

  disp(): void {
    console.log(
      `Title: ${this.title}, Date: ${this.date}, Source: ${this.source}, ImageUrl: ${this.imageUrl}, Lead: ${this.lead},  Text: ${this.text}`
    );
  }
}

class dayPhotosObj {
  imageUrl: string;
  date: any;
  source: string;
  description: string;

  constructor(
    imageUrl: string,
    date: any,
    source: string,
    description: string
  ) {
    this.imageUrl = imageUrl;
    this.date = date.toDate().toDateString();
    this.source = source;
    this.description = description;
  }

  disp(): void {
    console.log(
      `ImageUrl: ${this.imageUrl}, Date: ${this.date}, Source: ${this.source}, Description: ${this.description}`
    );
  }
}

class leaderInterviewsObj {
  title: string;
  date: any;
  videoUrl: string;

  constructor(title: string, date: any, videoUrl: string) {
    this.title = title;
    this.date = date.toDate().toDateString();
    this.videoUrl = videoUrl;
  }

  disp(): void {
    console.log(
      `Title: ${this.title}, Date: ${this.date}, VideoUrl: ${this.videoUrl}`
    );
  }
}

class warHistoryObj {
  title: string;
  date: any;
  videoUrl: string;

  constructor(title: string, date: any, videoUrl: string) {
    this.title = title;
    this.date = date.toDate().toDateString();
    this.videoUrl = videoUrl;
  }

  disp(): void {
    console.log(
      `Title: ${this.title}, Date: ${this.date}, VideoUrl: ${this.videoUrl}`
    );
  }
}

class worldAboutUkraineObj {
  title: string;
  date: any;
  source: string;
  sourceUrl: string;
  imageUrl: string;
  lead: string;

  constructor(
    title: string,
    date: any,
    source: string,
    sourceUrl: string,
    imageUrl: string,
    lead: string
  ) {
    this.title = title;
    this.date = date.toDate().toDateString();
    this.source = source;
    this.sourceUrl = sourceUrl;
    this.imageUrl = imageUrl;
    this.lead = lead;
  }

  disp(): void {
    console.log(
      `Title: ${this.title}, Date: ${this.date}, Source: ${this.source}, SourceUrl: ${this.sourceUrl}, ImageUrl: ${this.imageUrl}, Lead: ${this.lead}`
    );
  }
}

export {
  AnalyticalMaterialsObj,
  dayPhotosObj,
  leaderInterviewsObj,
  warHistoryObj,
  worldAboutUkraineObj,
};
