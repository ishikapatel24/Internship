import { BrowserRouter, Routes, Route } from "react-router-dom";

import Walkinlogin from "./component/Walkinlogin";
import Jobopeningdetails from "./component/Jobopeningdetails";
import Jobhallticket from "./component/Jobhallticket";
import Joblist from "./component/Joblist";
import app from "./css/app.scss";
import Register from "./component/Register";

function App() {
  // const jobLists = jobOpening.map((item,ind) => {
  //   return (
  //     <Joblist
  //       key={ind}
  //       {...item}
  //     />
  //   );
  // });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Joblist />} />
          <Route exact path="/walkinlogin/:id" element=<Walkinlogin /> />
          <Route
            exact
            path="/jobhallticket/:value/:date"
            element=<Jobhallticket />
          />
          <Route
            exact
            path="/jobopeningdetails/:id"
            element=<Jobopeningdetails />
          />
          <Route
            exact
            path="/register/:id"
            element=<Register />
          />
          
        </Routes>
      </BrowserRouter>

      {/* <section className="jobOpeningList">
      <Jobhallticket />
      </section> */}

      {/* <Register /> */}
      {/* <Personaldetail /> */}
      {/* <Qualification /> */}
      {/* <Review /> */}
    </>
  );
}

export default App;
