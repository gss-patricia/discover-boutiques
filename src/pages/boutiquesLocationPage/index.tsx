import type { NextPage } from "next";
import dynamic from "next/dynamic";
import ClipLoader from "react-spinners/ClipLoader";
import { useBoutiques } from "../../shared/hooks";
import { ErrorMessage, Spinner } from '../../styles'

const FullMap = dynamic(() => import("../../components/map/FullMap"), {
  ssr: false,
});

const BoutiquesLocationPage: NextPage = () => {
  const { userLocation, boutiques, loading, error } = useBoutiques();

  return (
    <div>
      {error &&  <ErrorMessage>{error}</ErrorMessage> }
      <Spinner>
        <ClipLoader loading={loading} size={150} />
      </Spinner>
      <FullMap userLocation={userLocation} boutiques={boutiques} />
    </div>
  );
};

export default BoutiquesLocationPage;
