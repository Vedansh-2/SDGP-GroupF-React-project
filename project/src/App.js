import { TopNav,Footer} from "govuk-react";
import HomePage from "./Pages/HomePage";
import ViewAppointment from "./Pages/ViewAppointment";
import { Link, Route,Routes } from "react-router-dom";

function App() {
  return (
   <div>
    <TopNav>
<Link to="/" style={{color:"white" }}><TopNav.NavLink>HomePage</TopNav.NavLink></Link>
<Link to="/ViewAppointment" style={{color:"white" }}><TopNav.NavLink>View Admin view Appointment</TopNav.NavLink></Link>
    </TopNav>


<Routes>
  <Route path="/" element={<HomePage/> }/>
  <Route path="/ViewAppointment" element={ <ViewAppointment/>}/>
</Routes>


    <Footer>

    </Footer>
  </div>
  );
}

export default App;
