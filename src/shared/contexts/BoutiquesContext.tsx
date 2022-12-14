import { Boutique, BoutiquesResponse } from "../../shared/types";
import { createContext, useEffect, useState } from "react";
import { IHttp, Http } from "../../shared/lib/httpClient";
import APIClient from "../lib/apiClient";
import { useGeolocation } from "../hooks/";
import { useCallback } from "react";

type BoutiquesContextProps = {
  boutiques: Boutique[];
  error: string;
  userLocation: GeolocationCoordinates;
  loading: boolean;
};

type BoutiquesProviderProps = {
  children: React.ReactNode;
};

const http: IHttp = Http();

export const BoutiquesContext = createContext({} as BoutiquesContextProps);

export const BoutiquesProvider = ({ children }: BoutiquesProviderProps) => {
  const { location, error: locationError } = useGeolocation();

  const [boutiques, setBoutiques] = useState<Boutique[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getBoutiques = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const query = `boutiques?latitude=${latitude}&longitude=${longitude}`;
        setLoading(true);
        const {
          data: { boutiques },
        } = await APIClient.get<BoutiquesResponse>(query);

        setBoutiques(boutiques);
      } catch (error) {
        const message = "Something went wrong";
        console.log(error);
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (locationError) {
      setError(locationError);
      return;
    }

    const { latitude, longitude } = location;
    const hasLocation = !!latitude && !!longitude
    if (!hasLocation) {
      getBoutiques(latitude, longitude);
    }
  }, [location, locationError, getBoutiques]);

  return (
    <BoutiquesContext.Provider
      value={{
        userLocation: location,
        boutiques,
        loading,
        error,
      }}
    >
      {children}
    </BoutiquesContext.Provider>
  );
};
