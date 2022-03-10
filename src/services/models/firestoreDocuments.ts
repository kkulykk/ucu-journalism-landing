class AnalyticalMaterialsObj {
  id: string;
  title: string;
  date: any;
  dateObj: Date;
  source: string;
  imageUrl: string;
  lead: string;
  text: string;
  

  constructor(
    id: string,
    title: string,
    date: any,
    source: string,
    imageUrl: string,
    lead: string,
    text: string
  ) {
    this.id = id;
    this.title = title;
    this.dateObj = date.toDate();
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

class DayPhotosObj {
  id: string;
  imageUrl: string;
  dateObj: Date;
  date: any;
  source: string;
  description: string;

  constructor(
    id: string,
    imageUrl: string,
    date: any,
    source: string,
    description: string
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.dateObj = date.toDate();
    this.date = date.toDate().toDateString();
    this.source = source;
    this.description = description;
  }

  disp(): void {
    console.log(
      `Id: ${this.id}, ImageUrl: ${this.imageUrl}, Date: ${this.date}, Source: ${this.source}, Description: ${this.description}`
    );
  }
}

class LeaderInterviewsObj {
  id: string;
  title: string;
  dateObj: Date;
  date: any;
  videoUrl: string;


  constructor(id: string, title: string, date: any, videoUrl: string) {
    this.id = id;
    this.title = title;
    this.dateObj = date.toDate();
    this.date = date.toDate().toDateString();
    this.videoUrl = videoUrl;
  }

  disp(): void {
    console.log(
      `Id: ${this.id}, Title: ${this.title}, Date: ${this.date}, VideoUrl: ${this.videoUrl}`
    );
  }
}

class WarHistoryObj {
  id: string;
  title: string;
  dateObj: Date;
  date: any;
  videoUrl: string;

  constructor(id: string, title: string, date: any, videoUrl: string) {
    this.id = id;
    this.title = title;
    this.dateObj = date.toDate();
    this.date = date.toDate().toDateString();
    this.videoUrl = videoUrl;
  }

  disp(): void {
    console.log(
      `Id: ${this.id}, Title: ${this.title}, Date: ${this.date}, VideoUrl: ${this.videoUrl}`
    );
  }
}

class WorldAboutUkraineObj {
  id: string;
  title: string;
  dateObj: Date;
  date: any;
  source: string;
  sourceUrl: string;
  imageUrl: string;
  lead: string;

  constructor(
    id: string,
    title: string,
    date: any,
    source: string,
    sourceUrl: string,
    imageUrl: string,
    lead: string
  ) {
    this.id = id;
    this.title = title;
    this.dateObj = date.toDate();
    this.date = date.toDate().toDateString();
    this.source = source;
    this.sourceUrl = sourceUrl;
    this.imageUrl = imageUrl;
    this.lead = lead;
  }

  disp(): void {
    console.log(
      `Id: ${this.id}, Title: ${this.title}, Date: ${this.date}, Source: ${this.source}, SourceUrl: ${this.sourceUrl}, ImageUrl: ${this.imageUrl}, Lead: ${this.lead}`
    );
  }
}

export {
  AnalyticalMaterialsObj,
  DayPhotosObj,
  LeaderInterviewsObj,
  WarHistoryObj,
  WorldAboutUkraineObj,
};
