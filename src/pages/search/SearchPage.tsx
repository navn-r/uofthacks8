import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./SearchPage.css";

const SearchPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle color="primary" class="ion-text-west">Munchify</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >

      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
