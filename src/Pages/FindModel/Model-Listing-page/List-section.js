import ListItem from "./ListItem";

function List({ data, handleProfile, currentPage }) {
  // setting page range
  function pageRange() {
    const pageLimit = 6;
    const rangeStart = (currentPage - 1) * pageLimit;
    const rangeEnd = currentPage * pageLimit;

    return data.filter(
      (item, index) => index >= rangeStart && index < rangeEnd && item
    );
  }

  return (
    <section className="list-section container mtop ">
      {data.length < 1 && (
        <div className="empty-search-text">Sorry No Result Found!</div>
      )}
      <ul className="main__list modelportfolio__container">
        {pageRange().map((item) => (
          <ListItem
            key={item._id}
            uuid={item.uuid}
            img={item.picture}
            fullName={item.fullName}
            firstCategory={item.category[0]}
            secondCategory={item.category[1]}
            state={item.state}
            agency={item.agency}
            country={item.country}
            handleProfile={() => handleProfile(item.id)}
          />
        ))}
      </ul>
    </section>
  );
}
export default List;
