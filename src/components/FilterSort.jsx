function FilterSort({ onFilter }) {
  const handleFilter = (e) => {
    const filter = e.target.value;
    const url = filter
      ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${filter}`
      : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    onFilter(url);
  };

  return (
    <div className="filter-sort">
      <select onChange={handleFilter} defaultValue="">
        <option value="">All</option>
        <option value="Alcoholic">Alcoholic</option>
        <option value="Non_Alcoholic">Non-Alcoholic</option>
      </select>
      <select onChange={(e) => console.log('Sort by:', e.target.value)}>
        <option value="">Sort by</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}

export default FilterSort;