import Link from "next/link";

export default function NotFound() {
	return (
		<div className="mx-auto flex h-screen flex-col items-center justify-center px-6 xl:px-0">
			<div className="block md:max-w-lg">
				{/* <img src="/images/illustrations/404.svg" alt="astronaut image"> */}
			</div>
			<div className="text-center xl:max-w-4xl">
				<h1 className="mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
					Page not found
				</h1>
				<p className="mb-5 text-base font-normal text-gray-500 md:text-lg dark:text-gray-300">
					Oops! Looks like you followed a bad link. If you think this
					is a problem with us, please tell us.
				</p>
				<Link href={"/"}>Go back home</Link>
			</div>
		</div>
	);
}
