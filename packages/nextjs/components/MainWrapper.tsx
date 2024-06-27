interface Comp {
  innerComponent: any; // todo: what type?
}

export const MainWrapper = (_this: Comp) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-full m-1 md:gap-2 md:p-2 md:m-4 md:shadow-xl md:border md:w-11/12 lg:w-3/5 border-base-300 bg-base-200 sm:rounded-lg">
          <_this.innerComponent />
        </div>
      </div>
    </>
  );
};
