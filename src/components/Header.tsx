import Link from 'next/link';

export default function Header() {
  return (
    <div className="bg-yellow-100">
      <div className="py-4 px-5 md:px-0 md:max-w-xl md:m-auto lg:max-w-2xl flex justify-between">
        <Link href="/">
          <a className="text-base font-black text-gray-800">Mike Lawson</a>
        </Link>
        <Link href="/about">
          <a className="text-gray-600 hover:text-gray-800 active:text-black">About</a>
        </Link>
      </div>
    </div>
  );
}
