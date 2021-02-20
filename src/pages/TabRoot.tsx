import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { home, person, search } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import HomePage from "./home/HomePage";
import ProfilePage from "./profile/ProfilePage";
import SearchPage from "./search/SearchPage";
import RecipeUpload from "./recipe_upload/RecipeUpload";
const TabRoot: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Route exact path="/main/profile">
          <ProfilePage />
        </Route>
        <Route exact path="/main/home">
          <HomePage />
        </Route>
        <Route path="/main/search">
          <SearchPage />
        </Route>
        <Redirect to="/main/home" from="/main" exact />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="profile" href="/main/profile">
          <IonIcon icon={person} />
        </IonTabButton>
        <IonTabButton tab="home" href="/main/home">
          <IonIcon icon={home} />
        </IonTabButton>
        <IonTabButton tab="search" href="/main/search">
          <IonIcon icon={search} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabRoot;
