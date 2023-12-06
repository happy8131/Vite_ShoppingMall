import { useEffect, useState } from "react";
import CardItem from "./Sections/CardItem";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchInput from "./Sections/SearchInput";
import axiosInstance from "../../utils/axios";
import { continents, prices } from "../../utils/fiterData";

const LandingPage = () => {
  const limit = 4;
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  useEffect(() => {
    fetchProducts({ skip, limit });
  }, []);

  const fetchProducts = async ({
    skip,
    limit,
    loadMore = false,
    filters = {},
    searchTerm = "",
  }) => {
    const params = {
      skip,
      limit,
      filters,
      searchTerm,
    };

    try {
      console.log("입장");
      const res = await axiosInstance.get("/products", { params });

      if (loadMore) {
        setProducts([...products, ...res.data.products]);
      } else {
        setProducts(res.data.products);
      }
      setHasMore(res.data.hasMore);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
      searchTerm,
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  const handleFilters = (newFilteredData, category) => {
    const newFilters = { ...filters };
    newFilters[category] = newFilteredData;
    if (category === "price") {
      const priceValues = handlePrice(newFilteredData);
      newFilters[category] = priceValues;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const handlePrice = (value) => {
    let array: number[] = [];

    for (const key in prices) {
      if (prices[key]._id === parseInt(value, 10)) {
        array = prices[key].array;
      }
    }
    return array;
  };

  const showFilteredResults = (filters: {
    continents: never[];
    price: never[];
  }) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm,
    };

    fetchProducts(body);
    setSkip(0);
  };

  const handleSearchTerm = (e) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm: e.target.value,
    };
    setSkip(0);
    setSearchTerm(e.target.value);
    fetchProducts(body);
  };

  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text-2xl">여행 상품 사이트</h2>
      </div>

      {/**filter */}
      <div className="flex gap-3">
        <div className="w-1/2">
          <CheckBox
            continents={continents}
            checkedContinents={filters.continents}
            onFilters={(filters) => handleFilters(filters, "continents")}
          />
        </div>
        <div className="w-1/2">
          <RadioBox
            prices={prices}
            checkedPrice={filters.price}
            onFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>
      </div>

      {/*search*/}
      <div className="flex justify-end mb-3">
        <SearchInput
          searchTerm={searchTerm}
          handleSearchTerm={handleSearchTerm}
        />
      </div>

      {/*Card*/}
      <div className="grid grid-col-2 sm:grid-cols-4 ">
        {products.map((product) => {
          return <CardItem key={product._id} product={product} />;
        })}
      </div>

      {/**LoadMore */}
      {hasMore && (
        <div className="flex justify-center mt-5">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
          >
            더 보기
          </button>
        </div>
      )}
    </section>
  );
};

export default LandingPage;
