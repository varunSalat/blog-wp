const ListingLoader = () => {
  return (
    <>
      <div className="grid xl:grid-cols-12">
        <div className="hidden md:flex md:col-span-2 flex-col gap-2 w-full padding"></div>
        <section className="padding flex flex-col gap-4 w-full col-span-8">
          <div>
            <span className="my-2 block text-2xl font-semibold">Articles </span>
            <div className="border-b-2 border-black/10" />
          </div>
          {Array.from({ length: 5 }).map((item, i) => (
            <div key={i}>
              <article className="flex flex-col gap-4 justify-start">
                <div className="lg:grid grid-cols-10 flex flex-col-reverse sm:gap-6 md:gap-8 items-start justify-start">
                  <div className="col-span-7  w-full flex flex-col gap-6">
                    <div>
                      <div className="w-[70%] h-6 animate-pulse bg-slate-400 rounded-md"></div>
                    </div>
                    <div>
                      <div className="w-[60%] h-4 animate-pulse bg-slate-300 rounded-md "></div>
                      <div className="w-[50%] mt-3 h-4 animate-pulse bg-slate-300 rounded-md "></div>
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap items-center justify-start gap-4">
                      <div className="w-[60px] rounded-md h-[30px] mb-3 animate-pulse bg-slate-300 "></div>
                    </div>
                  </div>
                  <div className="col-span-3 w-full none md:block">
                    <div className="rounded-2xl object-center object-cover none md:block aspect-[3/2] border-2 h-[200px] w-full mb-2 border-black/10 bg-slate-300 animate-pulse" />
                  </div>
                </div>
              </article>

              <div className="border-b-2 border-black/10" />
            </div>
          ))}
        </section>
        <div className="hidden xl:flex md:col-span-2 flex-col gap-2 w-full padding">
          <div>
            <span className="my-2 block text-2xl font-semibold">
              Most Viewed
            </span>
          </div>
          {Array.from({ length: 5 }).map((item, i) => (
            <div
              className="flex flex-col gap-2 pb-6 border-b-[2px] border-black/10  w-full my-2 cursor-pointer"
              key={i}
            >
              <div className="h-[145px] w-[255px] animate-pulse bg-slate-300 rounded-md"></div>
              <div className="w-[90%] h-[8px] bg-slate-300 rounded-sm animate-pulse"></div>
              <div className="w-[50%] h-[8px] bg-slate-300 rounded-sm animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="xl:grid block md:grid-cols-12">
        <div className="hidden md:flex md:col-span-2 flex-col gap-2 w-full padding"></div>
        <section className="padding flex flex-col gap-4 w-full col-span-8">
          <div>
            <span className="my-2 block text-2xl font-semibold">
              Most Viewed
            </span>
            <div className="border-b-2 border-black/10" />
          </div>
          <div className="flex gap-8 mt-6 justify-center flex-wrap">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                className="flex flex-col gap-2 w-[min(350px,100%)]   rounded-xl shadow p-3 my-2"
                key={i}
              >
                <div className="bg-slate-300 animate-pulse rounded-md h-[250px] object-cover w-full"></div>
                <div className="w-[80%] h-6 bg-slate-300 rounded-md"></div>
                <div className="w-[60%] h-4 bg-slate-300 rounded-md"></div>
                <div className="w-[40%] h-4 bg-slate-300 rounded-md"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ListingLoader;
