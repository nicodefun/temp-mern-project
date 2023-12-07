import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";
import styles from "./css/PageBtnContainer.module.css";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();
  //   console.log(numOfPages, currentPage);
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  //   console.log(search, pathname)
  //   console.log(pages);
  const handlePageChange = (num) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", num);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        className={`${styles["page-btn"]} ${
          activeClass && styles["active-btn"]
        }`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );
    if (currentPage >3) {
        pageButtons.push(
          <span  key='dots-1' className={styles['dots']}>...</span>
        );
      }
    if (currentPage !== 1 && currentPage !== 2) {
        pageButtons.push(
          addPageButton({ pageNumber: currentPage-1, activeClass: false })
        );
      }
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      );
    }
    if (currentPage !== numOfPages && currentPage !== numOfPages-1) {
        pageButtons.push(
          addPageButton({ pageNumber: currentPage+1, activeClass: false })
        );
      }
      if (currentPage  <numOfPages-2) {
        pageButtons.push(
          <span  key='dots-2' className={styles['dots']}>...</span>
        );
      }
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };

  return (
    <section className={styles["page-btn-section"]}>
      <button
        className={`${styles["prev-btn"]}`}
        onClick={() => {
          let page = currentPage - 1;
          if (currentPage === 1) {
            page = numOfPages;
          }
          handlePageChange(page);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className={styles["btn-container"]}>
        {renderPageButtons()}
        {/* {pages.map((num) => (
          <button
            key={num}
            className={`${styles["page-btn"]} ${
              currentPage === num && styles["active-btn"]
            }`}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </button>
        ))} */}
      </div>

      <button
        className={`${styles["next-btn"]}`}
        onClick={() => {
          let page = currentPage + 1;
          if (currentPage === numOfPages) {
            page = 1;
          }
          handlePageChange(page);
        }}
      >
        <HiChevronDoubleRight />
        next
      </button>
    </section>
  );
};
export default PageBtnContainer;
