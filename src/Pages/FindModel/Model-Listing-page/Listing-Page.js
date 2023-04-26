import "./Listing.css";
import Categories from "./Category-Section";
import AllSearch from "./Search-section";
import List from "./List-section";
import PageNation from "./PageNation";
import Footer from "../../Home/Layout/FooterSection/Footer/footer";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeGet } from "../../../redux/apiCalls";

function ListingPage({ handleProfile }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let unsubscribed = false;
    if (!unsubscribed) {
      const fetchData = () => {
        makeGet(dispatch, `/model/find/models/?model=${query}`, setMessage);
      };
      fetchData();
    }
    return () => {
      unsubscribed = true;
    };
  }, [dispatch, query]);

  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState(message);
  const [pageNumber, setPageNumber] = useState([]);
  const [currentPage, setCurrentPage] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
    setData(message);
  };

  function filterGender(e) {
    let filterInput = e.target.textContent;
    setGender(filterInput);
  }

  function filterCategory(e) {
    let filterInput = e.target.textContent;
    setCategory(filterInput);
  }

  function handleData() {
    let newData = [];

    //searching base on the available data
    //searching base on gender
    if (gender && !category && !search) {
      if (gender !== "all gender") {
        newData = message.filter((item) => item.gender === gender && item);
      } else {
        newData = message.map((item) => item);
      }

      //searching base on category
    } else if (!gender && category && !search) {
      if (category !== "all category") {
        newData = message.filter(
          (item) => item.category.find((str) => str === category) && item
        );
      } else {
        newData = message.map((item) => item);
      }

      //searching base on search input either country or state
    } else if (!gender && !category && search) {
      newData = message.filter((item) =>
        item.country.toLowerCase() === search.toLowerCase() ||
        item.state.toLowerCase() === search.toLowerCase()
          ? item
          : null
      );

      //searching base on gender and category
    } else if (gender && category && !search) {
      if (gender === "all gender" && category !== "all category") {
        newData = message.filter(
          (item) => item.category.find((str) => str() === category) && item
        );
      } else if (gender !== "all gender" && category === "all category") {
        newData = message.filter(
          (item) => item.gender.toLowerCase() === gender && item
        );
      } else if (gender !== "all gender" && category !== "all category") {
        newData = message.filter((item) =>
          item.gender.toLowerCase() === gender &&
          item.category.find((str) => str.toLowerCase() === category)
            ? item
            : null
        );
      } else {
        newData = message.map((item) => item);
      }

      //searching base on gender and search input
    } else if (gender && !category && search) {
      if (gender === "all gender") {
        newData = message.filter((item) =>
          item.country.toLowerCase() === search.toLowerCase()
            ? item
            : item.state.toLowerCase() === search.toLowerCase()
            ? item
            : null
        );
      } else {
        newData = message.filter((item) =>
          item.gender.toLowerCase() === gender &&
          item.country.toLowerCase() === search.toLowerCase()
            ? item
            : item.stats.gender.toLowerCase() === gender &&
              item.state.toLowerCase() === search.toLowerCase()
            ? item
            : null
        );
      }

      //searching base on category and search input
    } else if (!gender && category && search) {
      if (category === "all category") {
        newData = message.filter((item) =>
          item.country.toLowerCase() === search.toLowerCase()
            ? item
            : item.state.toLowerCase() === search.toLowerCase()
            ? item
            : null
        );
      } else {
        newData = message.filter((item) =>
          item.category.find((str) => str.toLowerCase() === category) &&
          item.country.toLowerCase() === search.toLowerCase()
            ? item
            : item.category.find((str) => str.toLowerCase() === category) &&
              item.state.toLowerCase() === search.toLowerCase()
            ? item
            : null
        );
      }

      //searching base on gender, category and search input
    } else if (gender && category && search) {
      if (gender === "all gender" && category === "all category") {
        newData = message.filter((item) =>
          item.country.toLowerCase() === search.toLowerCase()
            ? item
            : item.state.toLowerCase() === search.toLowerCase()
            ? item
            : null
        );
      } else if (gender !== "all gender" && category === "all category") {
        newData = message.filter((item) =>
          item.gender.toLowerCase() === gender &&
          item.country.toLowerCase() === search.toLowerCase()
            ? item
            : item.gender.toLowerCase() === gender &&
              item.state.toLowerCase() === search.toLowerCase()
            ? item
            : null
        );
      } else if (gender === "all gender" && category !== "all category") {
        newData = message.filter((item) =>
          item.category.find((str) => str.toLowerCase() === category) &&
          item.country.toLowerCase() === search.toLowerCase()
            ? item
            : item.category.find((str) => str.toLowerCase() === category) &&
              item.state.toLowerCase() === search.toLowerCase()
            ? item
            : null
        );
      } else if (gender !== "all gender" && category !== "all category") {
        newData = message.filter((item) =>
          item.gender.toLowerCase() === gender &&
          item.category.find((str) => str.toLowerCase() === category) &&
          item.country.toLowerCase() === search.toLowerCase()
            ? item
            : item.gender.toLowerCase() === gender &&
              item.category.find((str) => str.toLowerCase() === category) &&
              item.state.toLowerCase() === search.toLowerCase()
            ? item
            : null
        );
      }

      //if none of the above conditions are mate
    } else {
      newData = message.map((item) => item);
    }

    setData(newData);
    handlePageNum(newData);
    setCurrentPage(1);
    setSearch("");
  }

  function handlePageNum(data) {
    let pageNumList = [];
    const pageLimit = 4;
    const pageCount = Math.ceil(data.length / pageLimit);
    for (let i = 1; i <= pageCount; i++) {
      pageNumList.push(i);
    }

    setPageNumber(pageNumList);
    pageNumList = [];
  }

  useEffect(() => {
    // eslint-disable-next-line
    handleData();
    // eslint-disable-next-line
  }, [gender, category, message]);

  return (
    <>
      <Categories />
      <AllSearch
        filterGender={filterGender}
        filterCategory={filterCategory}
        handleSearch={handleQuery}
        handleData={handleData}
        category={category}
        gender={gender}
        search={search}
        searchResult={message.length}
        data={message}
      />

      <List
        data={data}
        handleProfile={handleProfile}
        currentPage={currentPage}
      />
      {message.length !== 0 && (
        <PageNation
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}

      <Footer />
    </>
  );
}

export default ListingPage;
