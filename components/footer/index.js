import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <h2>
        Made with 💜 by{" "}
        <Link href="https://twitter.com/dev__steve">dev_steve</Link>
      </h2>
    </div>
  );
};
const styles = {
  footer:
    "flex h-20 items-center justify-center bg-light dark:bg-dim dark:text-grey",
};

export default Footer;
