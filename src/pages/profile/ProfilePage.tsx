import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronDown, chevronUp } from "ionicons/icons";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import AddRecipeModal from "../../components/add-recipe-modal/AddRecipeModal";
import { useAuth } from "../../components/Auth/AuthProvider";
import { useData } from "../../components/Data/DataContext";
import RecipeCard from "../../components/recipe/RecipeCard";
import { getRecipes, getAllUsers } from "../../firebase/api";
import { Recipe, User } from "../../firebase/models";
import "./ProfilePage.css";
import ProfileVisitor from "../../pages/profile_visitor/ProfileVisitor";

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const { logout, user: authUser } = useAuth();
  const { user: dataUser, loading: dataLoading } = useData();
  const [recipes, setRecipes] = useState([] as Recipe[]);
  const [showModal, setShowModal] = useState(false);
  const [showExpandedUsers, setShowExpandedUsers] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [showUser, setShowUser] = useState<User | null>(null);
  const onLogout = useCallback(
    (e: any) => {
      e.preventDefault();
      logout(() => history.replace("/login"));
    },
    [history, logout]
  );

  const addRecipe = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (dataLoading) return;
    (async () => {
      setRecipes(await getRecipes(dataUser.recipeIds));
      setAllUsers(
        (await getAllUsers()).filter((user) => user.id !== dataUser.id)
      );
    })();
  }, [dataUser, dataLoading]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary" class="ion-text-west" style={{fontFamily: 'Covered By Your Grace', fontSize: '1.75rem'}}>
            Munchify
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <AddRecipeModal
          showModal={showModal}
          onSuccess={() => setShowModal(false)}
        />
        <div className="info">
          <div className="user-info">
            <IonAvatar>
              <img src={authUser.photoURL} />
            </IonAvatar>
            <div className="white profile-title auth-user-profile-title">
              <IonText color="light">{authUser.displayName}</IonText>
              <p>{authUser.email}</p>
            </div>
          </div>
          <div className="follower-info">
            {dataLoading ? (
              <IonSpinner />
            ) : (
              <>
                <div className="follower-box white">
                  <h4>{(dataUser as User).recipeIds.length}</h4>
                  <p>Munchies</p>
                </div>
                <div className="follower-box white">
                  <h4>{(dataUser as User).followerIds.length}</h4>
                  <p>Munchers</p>
                </div>
                <div className="follower-box white">
                  <h4>{(dataUser as User).followingIds.length}</h4>
                  <p>Munching</p>
                </div>
              </>
            )}
          </div>
          <div className="profile-button-container">
            <IonButton
              mode="ios"
              onClick={addRecipe}
              expand="block"
              color="light"
              className="blue-text"
            >
              Add Munchie
            </IonButton>
            <IonButton
              mode="ios"
              onClick={onLogout}
              expand="block"
              color="light"
              className="red-text"
            >
              Sign Out
            </IonButton>
          </div>
        </div>
        <div className="user-recipes-container">
          <div className="title-container">
            <h4>Find Munchers</h4>
            <IonButton
              fill="clear"
              color="danger"
              size="small"
              onClick={() => setShowExpandedUsers(!showExpandedUsers)}
            >
              <IonIcon
                slot="icon-only"
                icon={!showExpandedUsers ? chevronDown : chevronUp}
              ></IonIcon>
            </IonButton>
          </div>
          {showExpandedUsers && (
            <>
              <IonInput
                placeholder="Search..."
                onIonChange={(e) => setSearchUser(e.detail.value!)}
              ></IonInput>
              <IonList>
                {allUsers
                  .filter((user) => {
                    return user.displayName.includes(searchUser);
                  })
                  .map((user) => (
                    <IonItem
                      key={user.displayName}
                      onClick={() => setShowUser(user)}
                    >
                      <IonAvatar>
                        <img src={user.photoURL} alt="avatar" />
                      </IonAvatar>
                      <p className={"avatar-name"}>{user.displayName}</p>
                    </IonItem>
                  ))}
              </IonList>
            </>
          )}
        </div>
        {dataLoading ? (
          <IonSpinner />
        ) : (
          <div className="user-recipes-title">
            <h4>My Munchies</h4>
            {!!recipes &&
              recipes.map((r, i) => <RecipeCard recipe={r} key={i} />)}
          </div>
        )}
      </IonContent>
      <ProfileVisitor
        userId={showUser ? showUser.id : ""}
        showModal={!!showUser}
        onSuccess={() => {
          setShowUser(null);
        }}
      />
    </IonPage>
  );
};

export default ProfilePage;
