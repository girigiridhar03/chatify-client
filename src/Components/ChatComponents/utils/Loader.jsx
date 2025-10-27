const Loader = () => {
  return (
    <>
      <style>
        {`
          @keyframes smoothMove {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>

      <div className="fixed top-0 left-0 w-full h-[3px] overflow-hidden z-50 bg-transparent">
        <div className="h-full w-1/2 bg-blue-500 animate-[smoothMove_1.2s_linear_infinite]"></div>
      </div>
    </>
  );
};

export default Loader;

export const SmallLoader = () => {
  return (
    <div className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );
};
