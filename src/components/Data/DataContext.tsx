import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { useAuth } from "../Auth/AuthProvider";
import { User } from '../../firebase/models';

const DataContext = createContext(null as any);

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC = ({ children }) => {
  const { userId, authenticated } = useAuth();
  const [user, setUser] = useState(null as unknown as User);
  const [loading, setLoading] = useState(true);

  /**
   * Realtime Snapshot Watcher
   */
  useEffect(() => {
    if (!authenticated) return;
    // watcher
    const unsubscribe = db.collection('users').doc(userId).onSnapshot(
      (doc) => {
        if (doc.exists && !!doc.data()) {
          setUser(doc.data() as User);
          setLoading(false);
        }
      },
      (err) => console.error(err)
    );

    // cleanup
    return unsubscribe;
  }, [authenticated, userId]);

  const value = {
    user,
    setUser,
    loading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
