const SearchProperty = ({ search, onChangeText }) => {
  return (
    <div className="app">
      <div className="searchbar">
        <label htmlFor="search">RENT A PROPERTY</label>
        <input
          className="field"
          type="text"
          id="search"
          placeholder="Search by title or location."
          value={search}
          onChange={onChangeText}
        />
      </div>
    </div>
  )
}

export default SearchProperty