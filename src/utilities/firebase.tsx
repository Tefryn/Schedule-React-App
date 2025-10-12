import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, push, ref, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBds0TWPgOJXYOWxgUqVmc9gNEz6zDpnMA",
  authDomain: "class-scheduling-app-8e2d2.firebaseapp.com",
  databaseURL: "https://class-scheduling-app-8e2d2-default-rtdb.firebaseio.com",
  projectId: "class-scheduling-app-8e2d2",
  storageBucket: "class-scheduling-app-8e2d2.firebasestorage.app",
  messagingSenderId: "12015731254",
  appId: "1:12015731254:web:76184db942bfe8f9354e97",
  measurementId: "G-GS4J3CVJ6H"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDataQuery = (path: string): [unknown, boolean, Error | undefined] => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    return onValue(ref(database, path), (snapshot) => {
        setData( snapshot.val() );
        setLoading(false);
      }, (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }, [ path ]);

  return [ data, loading, error ];
};

const timestampMessage = (message: string) => (
  `${new Date().toLocaleString()}: ${message}`
);

// store a value under a path
export const useDataUpdate = (path: string): [(value:object) => void, string | undefined, Error | undefined] => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(Error);
  const updateData = useCallback((value: object) => {
    update(ref(database, path), value)
    .then(() => { 
      setMessage(timestampMessage('Update succeeded'));
    })
    .catch((error: Error) => {
      setMessage(timestampMessage('Update failed'));
      setError(error);
    })
  }, [path]);

  return [updateData, message, error];
};

// add a value under a Firebase-generated key
export const useDataPush = (path: string): [(value:object) => void, string | undefined, Error | undefined] => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(Error);
  const pushData = useCallback((value: object) => {
    push(ref(database, path), value)
    .then(() => { 
      setMessage(timestampMessage('Update succeeded'));
    })
    .catch((error: Error) => {
      setMessage(timestampMessage('Update failed'));
      setError(error);
    })
  }, [path]);

  return [pushData, message, error];
};