import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex h-20 items-center justify-center bg-[#0070f31c] ">
      <h2>
        Made with 💜 by{" "}
        <Link href="https://twitter.com/dev__steve">dev_steve</Link>
      </h2>
    </div>
  );
}

export default Footer
