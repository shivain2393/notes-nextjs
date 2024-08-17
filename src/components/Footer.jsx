import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-muted-foreground py-4 text-center">
      <p className="text-sm">
        <span className="text-blue-600">Quick Note</span>
        <span> | </span>&copy; 2024 Made by{" "}
        <Link href={"https://github.com/shivain2393"} target="_blank" className="hover:underline">Shivain</Link>
      </p>
    </footer>
  );
};

export default Footer;
