import { XY, btnStyle } from "@/util/constants";

interface SizeAdjusterProps {
  sizeHandler: (val: number, dimention: XY) => void;
  dimention: string;
  size: number;
}

const SizeAdjuster = ({ sizeHandler, dimention, size }: SizeAdjusterProps) => {
  return (
    <div className="w-1/2  text-center text-black">
      <h3 className="w-full">{dimention}</h3>
      <div className="md:w-1/2 w-3/4 flex flex-wrap mx-auto justify-center">
        <button
          className={btnStyle}
          onClick={() => {
            sizeHandler(size - 1, dimention.toLowerCase() as XY);
          }}
        >
          -
        </button>
        <p className=" cursor-text max-h-12 w-auto text-black items-center flex px-2 my-3 border-2 border-t-gray-500 border-r-gray-500 border-l-gray-100 border-b-gray-100 bg-white">
          {size}
        </p>
        <button
          className={btnStyle}
          onClick={() => {
            sizeHandler(size + 1, dimention.toLowerCase() as XY);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SizeAdjuster;
