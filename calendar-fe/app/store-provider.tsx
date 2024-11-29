"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore, persistor } from "@/lib/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Persistor } from "redux-persist/es/types";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  const persistorRef = useRef<Persistor>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current ?? persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
