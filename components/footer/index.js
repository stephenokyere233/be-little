import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex h-20 items-center justify-center bg-[#0070f31c] dark:bg-dim dark:text-gray-400">
      <h2>
        Made with 💜 by{" "}
        <Link href="https://twitter.com/dev__steve">dev_steve</Link>
      </h2>
    </div>
  );
}

export default Footer
