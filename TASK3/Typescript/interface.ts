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
    classoption:string;
    arrowimage: string;
    courseEnrollInfo:{
      totalStudents:number,
      startingDate:string,
      endingDate:string
    },
    previewimage: boolean;
    manageimage: boolean;
    gradeimage: boolean;
    reportimage: boolean
}

interface ResponseDetails{
  Carddetails:cardData[];
}

export {cardData,ResponseDetails};