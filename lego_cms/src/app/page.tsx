import Link from  "next/link";

export default function Home() {
  return (
    <div>
      <button>
        <Link href="/admin/trends"> Admin </Link>
      </button>
    </div>
  );
}
