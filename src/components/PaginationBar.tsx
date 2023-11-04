import Link from "next/link";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationBar({
  currentPage,
  totalPages,
}: PaginationBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numbersPageItems: JSX.Element[] = [];
  for (let page = minPage; page < maxPage; page++) {
    numbersPageItems.push(
      <Link
        href={"?page=" + page}
        key={page}
        className={`join-item btn ${
          currentPage === page ? "btn-active pointer-events-none" : ""
        }`}
      >
        {page}
      </Link>,
    );
  }

  return (
  <>
  <div className="join hidden sm:block">
    {numbersPageItems}
  </div>
  <div className="join block sm:hidden">
{currentPage>1&&
<Link
className="join-item btn"
href={"?page="+(currentPage-1)}
>
&#8592;
</Link>}
<button className="join-item btn pointer-events-none">
    Page{currentPage}
</button>
{currentPage>1&&
<Link
 className="join-item btn"
href={"?page="+(currentPage+1)}
>
&#8594;
</Link>}
  </div>
  </>)
}
