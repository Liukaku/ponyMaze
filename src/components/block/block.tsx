import { MazeProps } from "@/util/types";
import Image from "next/image";
import { assignClasses } from "./block.utils";

interface BlockProps {
  data: MazeProps;
  pony: string;
}

const Block = ({ data, pony }: BlockProps) => {
  const { walls, width, isPony, isDomokun, isExit } = data;

  const elementClass = assignClasses(walls, isPony, isDomokun, isExit);

  const w = 90 / width;
  const elementStyle = {
    height: w + "vmin",
    width: w + "vmin",
  };

  return (
    <div className={elementClass.join(" ")} style={elementStyle}>
      {isPony ? (
        <Image
          className="mx-auto"
          src={`/ponies/${pony}.png`}
          alt={""}
          width={50}
          height={50}
        />
      ) : isDomokun ? (
        <Image
          className="mx-auto"
          src={`/domo.png`}
          alt={""}
          width={100}
          height={100}
          quality={100}
        />
      ) : isExit ? (
        <Image
          className="mx-auto"
          src={`/door.png`}
          alt={""}
          width={100}
          height={100}
          quality={100}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Block;
