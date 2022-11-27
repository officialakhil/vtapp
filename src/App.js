import AppHeader from "./components/AppHeader";
import { Footer } from "./components/Footer";
import Comingsoon from "./pages/Comingsoon";
import Team from "./pages/Team";
import Event from "./pages/Event";
import ScrollToTop from "./components/ScrollToTop";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { authApp } from "./utils/auth";
import { firestore } from "./utils/firestore";
import { setDoc, doc } from "firebase/firestore";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { EventDetail } from "./pages/EventDetail";

function App() {
  const [user, setUser] = useState(authApp.currentUser);

  useEffect(() => {
    const unsubscribeAuthChanges = onAuthStateChanged(
      authApp,
      (loggedInUser) => {
        if (loggedInUser) {
          const userDoc = {
            email: loggedInUser.email,
            name: loggedInUser.displayName,
            photoUrl: loggedInUser.photoURL,
          };
          console.log({ uid: loggedInUser.uid, ...userDoc });

          setDoc(doc(firestore, "users", loggedInUser.uid), userDoc).catch(
            (error) => {
              console.error(error);
            }
          );
        }
        setUser(loggedInUser);
      }
    );

    return unsubscribeAuthChanges;
  }, []);

  return (
    <div className="bg-black min-h-screen scroll-smooth">
      {/* <AppHeader />
      <Hero/>
      <About/>
      <Events/>
      <TeamAndSponsors/>
      <TShirt/>
      <Comingsoon/>
      <Footer/> */}

      <BrowserRouter>
        <ScrollToTop />
        <AppHeader currentUser={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Event />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Comingsoon />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
