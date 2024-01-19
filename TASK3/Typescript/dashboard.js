// import card from "../Json/carddata.json";
// import alert from "../Json/alert.json" assert { type: "json" };
// import ann from "../Json/announcement.json" assert { type: "json" };
var cardhtml = document.querySelector(".cards");
var alerthtml = document.querySelector(".alert");
var announcementhtml = document.querySelector(".announcement");
fetch("./Json/carddata.json")
    .then(function (response) {
    return response.json();
})
    .then(function (card) {
    var cardlen = card.Carddetails.length;
    for (var i = 0; i < cardlen; i++) {
        cardhtml.innerHTML += "\n          <div class=\"cardmain".concat(i + 1, "\">\n          ").concat(i == 3 ? "<div id=\"expired\">EXPIRED</div>" : "", "\n          <div class=\"card1\">\n              <img src=\"").concat(card.Carddetails[i].cardimage, "\">\n              <div class=\"carddetails\">\n                  <div class=\"bigtext\" id=\"fav\">\n                      <div>").concat(card.Carddetails[i].heading, "</div>\n                      <img src=\"").concat(card.Carddetails[i].favimage, "\">\n                  </div>\n                  <div class=\"smalltext\">").concat(card.Carddetails[i].courseSubject, " | Grade ").concat(card.Carddetails[i].courseGrade, "<span style=\"padding-left: 0.2rem; color: #1F7A54;\">+").concat(card.Carddetails[i].additionalCourseGrade, "</span></div>\n                  <div class=\"smalltext\"><span>").concat(card.Carddetails[i].courseLength.units, "</span> Units <span style=\"padding-left: 0.2rem;\">").concat(card.Carddetails[i].courseLength.lessons, "</span> Lessons <span style=\"padding-left: 0.2rem;\">").concat(card.Carddetails[i].courseLength.topics, "</span> Topics</div>\n                  <div class=\"bigtext\" id=\"classdet\">\n                  <select class=\"option2\">\n                     ").concat(card.Carddetails[i].classoption === "1" ? "<option value=\"Mr.Frank's Class B\" selected>Mr.Frank's Class B</option>\n                     <option value=\"Mr.Frank's Class A\">Mr.Frank's Class A</option>\n                     <option value=\"All Classes\">All Classes</option>\n                     <option value=\"No Classes\">No Classes</option>" : "", "\n                     ").concat(card.Carddetails[i].classoption === "2" ? "<option value=\"Mr.Frank's Class B\">Mr.Frank's Class B</option>\n                     <option value=\"Mr.Frank's Class A\" selected>Mr.Frank's Class A</option>\n                     <option value=\"All Classes\">All Classes</option>\n                     <option value=\"No Classes\">No Classes</option>" : "", "\n                     ").concat(card.Carddetails[i].classoption === "3" ? "<option value=\"Mr.Frank's Class B\">Mr.Frank's Class B</option>\n                     <option value=\"Mr.Frank's Class A\">Mr.Frank's Class A</option>\n                     <option value=\"All Classes\" selected>All Classes</option>\n                     <option value=\"No Classes\">No Classes</option>" : "", "\n                     ").concat(card.Carddetails[i].classoption === "4" ? "<option value=\"Mr.Frank's Class B\">Mr.Frank's Class B</option>\n                     <option value=\"Mr.Frank's Class A\">Mr.Frank's Class A</option>\n                     <option value=\"All Classes\">All Classes</option>\n                     <option value=\"No Classes\" selected>No Classes</option>" : "", " \n                  </select>\n                  </div>\n                  <div class=\"smalltext\">").concat(card.Carddetails[i].totalstudents, "</div>\n              </div>\n          </div>\n          <div class=\"symbol\">\n              <div><img src=\"").concat(card.Carddetails[i].previewimage, "\"></div>\n              <div class=\"lightimage\"><img src=\"").concat(card.Carddetails[i].manageimage, "\"></div>\n              <div class=\"lightimage\"><img src=\"").concat(card.Carddetails[i].gradeimage, "\"></div>\n              <div><img src=\"").concat(card.Carddetails[i].reportimage, "\"></div>\n          </div>\n      \u00A0\u00A0\u00A0\u00A0</div>");
    }
});
fetch("./Json/alert.json")
    .then(function (response) {
    return response.json();
})
    .then(function (alert) {
    // console.log(alert);
    var len = alert.alert.length;
    var bg = "background-color:white;";
    for (var i = 0; i < len; i++) {
        alerthtml.innerHTML += "<div class=\"alertdata\" style=\"".concat(alert.alert[i].bgcolor == 1 ? bg : "", "\">\n    <div class=\"alertflex\">\n      <div class=\"alertcontent\">").concat(alert.alert[i].content, "\n      </div>\n      <img src=\"").concat(alert.alert[i].image, "\" alt=\"\" class=\"alertimage\">\n  </div>\n  <div class=\"alertcourse\"><span>").concat(alert.alert[i].cource.course1, "</span>").concat(alert.alert[i].cource.msg, "</div>\n  <div class=\"alertdate\">").concat(alert.alert[i].date, "</div>\n  </div>");
    }
});
fetch("./Json/announcement.json")
    .then(function (response) {
    return response.json();
})
    .then(function (ann) {
    var ln = ann.announcement.length;
    for (var i = 0; i < ln; i++) {
        announcementhtml.innerHTML += "<div class=\"announcementdata\" ".concat(ann.announcement[i].bgcolor == 1 ? "style=background-color:white;" : "", ">\n  <div class=\"announcementflex\">\n    <div class=\"announcementname\">\n      <span>").concat(ann.announcement[i].name.designation, "</span>&nbsp;").concat(ann.announcement[i].name.fullname, "\n    </div>\n    <img\n      src=\"").concat(ann.announcement[i].image, "\"\n      alt=\"\"\n      class=\"announcementimage\"\n    />\n  </div>\n  <div class=\"announcementcontent\">").concat(ann.announcement[i].lecture, "</div>\n  <div class=\"announcementcourse\">").concat(ann.announcement[i].cource, "</div>\n  <div class=\"filedate\">\n    <div class=\"file\">\n     ").concat(ann.announcement[i].ig == 1
            ? "<img src=\"./image/fileAttach.png\" alt=\"\">&nbsp;"
            : "").concat(ann.announcement[i].files, "\n    </div>\n    <div class=\"announcementdate\">").concat(ann.announcement[i].date, "</div>\n  </div>\n  </div>");
    }
});
// for hamburgermenu option and onclick function
var hamburgerMenu = document.querySelector(".hamburgermenu");
function myFunction() {
    var x = document.querySelector(".dashboardoption");
    // console.log(x.style.display);
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    else {
        x.style.display = "block";
    }
}
hamburgerMenu.addEventListener("click", myFunction);
// for resize screen (display dashboard option)
function resizefunction() {
    var hamburgermenu = document.querySelector(".item2");
    var hamburgermenudisplay = window.getComputedStyle(hamburgermenu).display;
    var dashboardoption = document.querySelector(".dashboardoption");
    var dashboardoptiondisplay = window.getComputedStyle(dashboardoption).display;
    console.log(hamburgermenudisplay);
    if (hamburgermenudisplay === "none") {
        dashboardoption.style.display = "flex";
    }
    else if (hamburgermenudisplay !== "none" &&
        dashboardoptiondisplay === "flex") {
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
