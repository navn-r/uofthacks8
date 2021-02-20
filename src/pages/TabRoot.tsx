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
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";

const TabRoot: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet id="main">
      <Route exact path="/main/tab1">
        <Tab1 />
      </Route>
      <Route exact path="/main/tab2">
        <Tab2 />
      </Route>
      <Route path="/main/tab3">
        <Tab3 />
      </Route>
      <Redirect to="/main/tab1" from="/main" />
      <Redirect to="/main/tab1" from="/" exact />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href="/main/tab1">
        <IonIcon icon={triangle} />
        <IonLabel>Tab 1</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab2" href="/main/tab2">
        <IonIcon icon={ellipse} />
        <IonLabel>Tab 2</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/main/tab3">
        <IonIcon icon={square} />
        <IonLabel>Tab 3</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default TabRoot;
