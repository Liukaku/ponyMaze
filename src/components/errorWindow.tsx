import { btnStyle } from "@/util/constants";
import Image from "next/image";
import React from "react";

interface ErrorWindowProps {
  error: string;
  closeHandler: () => void;
}

const ErrorWindow = ({ error, closeHandler }: ErrorWindowProps) => {
  return (
    <div className=" w-full h-full absolute">
      <div className=" shadow-xl shadow-black/30 md:w-3/5 w-10/12 mt-16 mx-auto border-2 pb-5 bg-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-100 border-t-gray-100">
        <div className="p-1 text-xl text-white mb-5 headerBarGrey leading-none bg-zinc-300 border-t-zinc-200 border-r-zinc-200 border-l-zinc-400 border-b-zinc-400">
          <h1 className="select-none text">Error!</h1>
        </div>
        <div className="flex w-11/12 mx-auto items-center justify-center">
          <Image
            className="mr-2"
            src={`/msg_error-0.png`}
            alt={""}
            width={40}
            height={40}
          />
          <h1 className="text-center text-black">{error}</h1>
        </div>

        <button
          className={btnStyle + " mx-auto "}
          onClick={() => closeHandler()}
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default ErrorWindow;
