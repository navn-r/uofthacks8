import {
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./HomePage.css";
import RecipeCard from "../../components/recepie/RecipeCard";
import { useData } from "../../components/Data/DataContext";


const HomePage: React.FC = () => {
  const { user: dataUser, loading: dataLoading } = useData();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      {dataLoading ? (<IonSpinner></IonSpinner>) : (<RecipeCard user={dataUser}></RecipeCard>)}
    </IonPage>
  );
};

export default HomePage;
