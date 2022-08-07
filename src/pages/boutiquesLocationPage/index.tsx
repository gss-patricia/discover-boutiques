import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useBoutiques } from "../../shared/hooks";
import { ErrorMessage } from '../../styles'

const FullMap = dynamic(() => import("../../components/map/FullMap"), {
  ssr: false,
});

const BoutiquesLocationPage: NextPage = () => {
  const { userLocation, boutiques, error } = useBoutiques();

  return (
    <div>
      {error &&  <ErrorMessage>{error}</ErrorMessage> }
      <FullMap userLocation={userLocation} boutiques={boutiques} />
    </div>
  );
};

export default BoutiquesLocationPage;
