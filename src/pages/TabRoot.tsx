import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { ellipse, square, triangle } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import Tab1 from "./profile/Tab1";
import HomePage from "./home/HomePage";
import SearchPage from "./search/SearchPage";

const TabRoot: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Route exact path="/main/tab1">
          <Tab1 />
        </Route>
        <Route exact path="/main/home">
          <HomePage />
        </Route>
        <Route path="/main/search">
          <SearchPage />
        </Route>
        <Redirect to="/main/tab1" from="/main" exact />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/main/tab1">
          <IonIcon icon={triangle} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/main/home">
          <IonIcon icon={ellipse} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/main/search">
          <IonIcon icon={square} />
          <IonLabel>Search</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabRoot;
