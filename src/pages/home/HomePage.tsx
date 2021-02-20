import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./HomePage.css";

const MockFollowers = [
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7742?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7743?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7744?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7745?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7746?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7747?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7748?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7749?d=identicon&f=y',
];

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Munchify</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h4 className="home-page-followers-title">Followers:</h4>
        <div className="followers-icon-container">
          {MockFollowers.map((f, i) => (
            <IonAvatar key={i}>
              <img src={f} />
            </IonAvatar>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
