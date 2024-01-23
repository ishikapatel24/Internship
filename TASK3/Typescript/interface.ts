interface cardData {
    cardimage: string;
    heading: string;
    favimage: string;
    courseSubject: string;
    courseGrade: number;
    additionalCourseGrade: number;
    courseLength:{
      units: number;
      lessons: number;
      topics: number;
    };
    classoption: string;
    arrowimage: string;
    totalstudents: string;
    previewimage: string;
    manageimage: string;
    gradeimage: string;
    reportimage: string
}

interface ResponseDetails{
  Carddetails:cardData[];
}

export {cardData,ResponseDetails};