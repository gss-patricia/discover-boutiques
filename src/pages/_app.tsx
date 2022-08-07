import type { AppProps } from "next/app";
import { BoutiquesProvider, GeolocationProvider } from "../shared/contexts/";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GeolocationProvider>
      <BoutiquesProvider>
        <Component {...pageProps} />
      </BoutiquesProvider>
    </GeolocationProvider>
  );
}

export default MyApp;
