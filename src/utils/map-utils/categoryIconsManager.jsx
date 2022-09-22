import { BookOpenIcon, LibraryIcon, SunIcon } from "@heroicons/react/outline";
import CrossIcon from "../../components/CrossIcon";
import ParkIcon from "../../components/ParkIcon";

 const setIconToCategory = (category,width,height) => {
    const iconStyle = `h-${height} w-${width} text-indigo-600 inline`;
    let result;
    switch (category) {
      case "Culturale":
        result = <BookOpenIcon className={iconStyle} aria-hidden="true" />;
        break;
      case "Architetturale":
        result = <LibraryIcon className={iconStyle} aria-hidden="true" />;
        break;
      case "Naturalistica":
        result = <SunIcon className={iconStyle} aria-hidden="true" />;
        break;
      case "ZonaParcheggio":
        result = <ParkIcon className={iconStyle} color="#4F46E5" />;
        break;
      case "Spirituale":
        result = <CrossIcon className={iconStyle} color="#4F46E5" />;
        break;
      default:
        result = "";
    }
    return result;
  };
  export default setIconToCategory;