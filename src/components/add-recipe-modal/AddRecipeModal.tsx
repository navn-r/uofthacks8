import { IonButton, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

interface AddRecipeModalProps { 
  showModal: boolean;
  onSuccess: () => void;
}

const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ showModal, onSuccess }) => {
  return (
    <IonModal mode="ios" swipeToClose={true} isOpen={showModal} onDidDismiss={onSuccess}>
       <IonHeader>
         <IonToolbar>
           <IonTitle>Add Recipe</IonTitle>
         </IonToolbar>
       </IonHeader>
       <IonButton onClick={onSuccess}>Close Modal</IonButton>
    </IonModal>
  );
};

export default AddRecipeModal;