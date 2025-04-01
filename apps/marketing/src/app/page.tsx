import Image from "next/image";

export default function Home() {
  return (
    <section className="relative pt-16 items-center flex h-screen max-h-215">
      <div className="container mx-auto items-center flex flex-wrap">
        <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
          <div className="pt-32 sm:pt-0">
            <h2 className="font-semibold text-4xl text-blueGray-600">
              Turn Chores into Adventures!
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
              Make everyday tasks exciting! Assign fun challenges to your kids,
              reward their achievements, and watch them grow.
            </p>
            <div className="mt-12">
              <a
                href="/"
                target="_blank"
                className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                rel="noreferrer"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <Image
        className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
        src="/images/img01.jpg"
        alt="Turn Chores into Adventures!"
        width={1000}
        height={1000}
      /> */}

      <Image
        src="/images/img01.jpg"
        alt="Turn Chores into Adventures!"
        width={1000}
        height={1000}
      />
    </section>
  );
}
