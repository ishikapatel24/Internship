// import card from "../Json/carddata.json";
// import alert from "../Json/alert.json" assert { type: "json" };
// import ann from "../Json/announcement.json" assert { type: "json" };
import { cardData, ResponseDetails } from "./interface";


const cardhtml = document.querySelector(".cards") as HTMLElement;
const alerthtml = document.querySelector(".alert") as HTMLElement;
const announcementhtml = document.querySelector(".announcement") as HTMLElement;

fetch("./Json/carddata.json")
  .then(function (response) {
    return response.json() as Promise<ResponseDetails>;
  })
  .then(function (card) {
    const cardlen = card.Carddetails.length;
    console.log(cardlen);
    for (let i = 0; i < cardlen; i++) {
      cardhtml.innerHTML += `
          <div class="cardmain${i + 1}">
          ${i == 3 ? `<div id="expired">EXPIRED</div>` : ""}
          <div class="card1">
              <img src="${card.Carddetails[i].cardimage}">
              <div class="carddetails">
                  <div class="bigtext" id="fav">
                      <div>${card.Carddetails[i].heading}</div>
                      <img src="${card.Carddetails[i].favimage}">
                  </div>
                  <div class="smalltext">${card.Carddetails[i].courseSubject
        } | Grade ${card.Carddetails[i].courseGrade
        }<span style="padding-left: 0.2rem; color: #1F7A54;">+${card.Carddetails[i].additionalCourseGrade
        }</span></div>
                  <div class="smalltext"><span>${card.Carddetails[i].courseLength.units
        }</span> Units <span style="padding-left: 0.2rem;">${card.Carddetails[i].courseLength.lessons
        }</span> Lessons <span style="padding-left: 0.2rem;">${card.Carddetails[i].courseLength.topics
        }</span> Topics</div>
                  <div class="bigtext" id="classdet">
                  ${card.Carddetails[i].classoption === null ? 
                  `<select class="option2">
                     <option value="All Classes" selected>All Classes</option>
                  </select>`: ``}
                  ${card.Carddetails[i].classoption === "Mr.Frank's Class A" ?
                  `<select class="option2">
                     <option value="Mr.Frank's Class A" selected>Mr.Frank's Class A</option>
                     <option value="Mr.Frank's Class B">Mr.Frank's Class B</option>
                  </select>`: ``}
                  ${card.Carddetails[i].classoption === "Mr.Frank's Class B" ?
                  `<select class="option2">
                     <option value="Mr.Frank's Class B" selected>Mr.Frank's Class B</option>
                     <option value="Mr.Frank's Class A">Mr.Frank's Class A</option>
                  </select>`: ``}
                  ${card.Carddetails[i].classoption === "" ? 
                  `<select class="option2" disabled>
                     <option value="No Classes" selected>No Classes</option>
                  </select>`: ``} 
                  </div>
      
                  ${card.Carddetails[i].courseEnrollInfo.totalStudents !== null
                  ? `<div class="smalltext">${card.Carddetails[i].courseEnrollInfo.totalStudents} students &nbsp;`
                  :
                  `<div class="smalltext">`
                  }
                  ${card.Carddetails[i].courseEnrollInfo.startingDate !== null
                  ? `| &nbsp;${card.Carddetails[i].courseEnrollInfo.startingDate} - ${card.Carddetails[i].courseEnrollInfo.endingDate}</div>`
                  : `</div>`
                  }
              </div>
          </div>
          <div class="symbol">
              <div><img src="image/preview.png" ${!card.Carddetails[i].previewimage
                ?` style="opacity : 40%"`
                :``}></div>
              <div class="lightimage" ${!card.Carddetails[i].manageimage
                ?` style="opacity : 40%"`
                :``}><img src="image/manage course.png"></div>
              <div class="lightimage" ${!card.Carddetails[i].gradeimage
                ?` style="opacity : 40%"`
                :``}><img src="image/grade submissions.png"></div>
              <div><img src="image/reports.png" ${!card.Carddetails[i].reportimage
                ?` style="opacity : 40%"`
                :``}></div>
          </div>
        </div>`;
    }
  });

fetch("./Json/alert.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (alert) {
    // console.log(alert);
    const len = alert.alert.length;
    const bg = "background-color:white;";

    for (let i = 0; i < len; i++) {
      alerthtml.innerHTML += `<div class="alertdata" style="${alert.alert[i].bgcolor == 1 ? bg : ""
        }">
    <div class="alertflex">
      <div class="alertcontent">${alert.alert[i].content}
      </div>
      <img src="${alert.alert[i].image}" alt="" class="alertimage">
  </div>
  <div class="alertcourse"><span>${alert.alert[i].cource.course1}</span>${alert.alert[i].cource.msg
        }</div>
  <div class="alertdate">${alert.alert[i].date}</div>
  </div>`;
    }
  });

fetch("./Json/announcement.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (ann) {
    const ln = ann.announcement.length;
    for (let i = 0; i < ln; i++) {
      announcementhtml.innerHTML += `<div class="announcementdata" ${ann.announcement[i].bgcolor == 1 ? `style=background-color:white;` : ``
        }>
  <div class="announcementflex">
    <div class="announcementname">
      <span>${ann.announcement[i].name.designation}</span>&nbsp;${ann.announcement[i].name.fullname
        }
    </div>
    <img
      src="${ann.announcement[i].image}"
      alt=""
      class="announcementimage"
    />
  </div>
  <div class="announcementcontent">${ann.announcement[i].lecture}</div>
  <div class="announcementcourse">${ann.announcement[i].cource}</div>
  <div class="filedate">
    <div class="file">
     ${ann.announcement[i].ig == 1
          ? `<img src="./image/fileAttach.png" alt="">&nbsp;`
          : ``
        }${ann.announcement[i].files}
    </div>
    <div class="announcementdate">${ann.announcement[i].date}</div>
  </div>
  </div>`;
    }
  });


// for hamburgermenu option and onclick function

const hamburgerMenu = document.querySelector(".hamburgermenu") as HTMLElement;

function myFunction() {
  const x = document.querySelector(".dashboardoption") as HTMLElement;
  // console.log(x.style.display);
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

hamburgerMenu.addEventListener("click", myFunction);

// for resize screen (display dashboard option)

function resizefunction() {
  const hamburgermenu = document.querySelector(".item2") as HTMLElement;
  let hamburgermenudisplay = window.getComputedStyle(hamburgermenu).display as string;
  const dashboardoption = document.querySelector(".dashboardoption") as HTMLElement;
  let dashboardoptiondisplay = window.getComputedStyle(dashboardoption).display as string;
  console.log(hamburgermenudisplay);
  if (hamburgermenudisplay === "none") {
    dashboardoption.style.display = "flex";
  } else if (
    hamburgermenudisplay !== "none" &&
    dashboardoptiondisplay === "flex"
  ) {
    dashboardoption.style.display = "none";
  }
}

window.addEventListener("resize", resizefunction);

// const x = document.querySelector(".alertnum");

// function alertFunction() {
//   console.log(x.style.visibility);
//   if (x.style.visibility === "hidden") {
//       x.style.visibility = "visible";
//   } else {
//       x.style.visibility = "hidden";
//   }
// }

// x.addEventListener("click",alertFunction);

// const y = document.querySelector(".announcementsnum");

// function announcementsFunction() {
//   console.log("clicked");
//   if (y.style.visibility === "hidden") {
//       y.style.visibility = "visible";
//   } else {
//       y.style.visibility = "hidden";
//   }
// }

// y.addEventListener("click",announcementsFunction);

// Alert Option

// <div ${
//   card.Carddetails[i].classoption === null
//     ? ` style="color:#686868"`
//     : ``
// }>${
// card.Carddetails[i].classoption !== null
// ? card.Carddetails[i].classoption
// : `No Classes`
// }</div>