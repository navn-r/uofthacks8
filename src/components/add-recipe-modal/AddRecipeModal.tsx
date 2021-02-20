import { IonButton, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { close } from 'ionicons/icons';
import React from 'react';
import RecipeUpload from '../../pages/recipe_upload/RecipeUpload';

interface AddRecipeModalProps { 
  showModal: boolean;
  onSuccess: () => void;
}

const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ showModal, onSuccess }) => {
  return (
    <IonModal mode="ios" isOpen={showModal}>
       <IonHeader>
         <IonToolbar>
            <IonButton fill="clear" color="danger" onClick={onSuccess} size="small"><IonIcon slot="icon-only" icon={close}></IonIcon></IonButton>
           <IonTitle>Add Recipe</IonTitle>
         </IonToolbar>
       </IonHeader>
       <RecipeUpload onSuccess={() => console.log('weeee')} />
    </IonModal>
  );
};

export default AddRecipeModal;