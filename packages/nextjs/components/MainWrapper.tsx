interface Comp {
  innerComponent: any; // todo: what type?
}

export const MainWrapper = (_this: Comp) => {
  return (
    // text size: text-sm sm:text-md xl:text-xl
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-full px-1 py-2 md:py-6 md:px-6 lg:py-10 lg:px-8 xl:px-0 xl:py-12 lg:w-11/12 xl:w-3/5 bg-base-200 xl:border xl:border-base-300 xl:rounded-lg xl:shadow-xl ">
          <_this.innerComponent />
        </div>
      </div>
    </>
  );
};
