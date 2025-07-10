import { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setFilters,
  fetchProductsByFilters,
} from "../../redux/slices/productSlice";

const CategoryGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log("search Term:", searchTerm);
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all/?search=${searchTerm}`);
  };

  const categories = [
    {
      name: "T-Shirt",
      image: "https://picsum.photos/500/500?random=1",
      categoryAddress: "T shirt",
    },
    {
      name: "Round Neck",
      image: "https://picsum.photos/500/500?random=2",
      categoryAddress: "Round Neck",
    },
    {
      name: "Collar T-Shirt",
      image: "https://picsum.photos/500/500?random=3",
      categoryAddress: "Collar T-Shirt",
    },
    {
      name: "Bottom Wear Men",
      image: "https://picsum.photos/500/500?random=4",
      categoryAddress: "Bottom Wear Men",
    },
    {
      name: "Women",
      image: "https://picsum.photos/500/500?random=5",
      categoryAddress: "Women",
    },
    {
      name: "Jackets",
      image: "https://picsum.photos/500/500?random=6",
      categoryAddress: "jackets",
    },
    {
      name: "Women Bottom",
      image: "https://picsum.photos/500/500?random=7",
      categoryAddress: "Women Bottom",
    },
    {
      name: "Shoes",
      image: "https://picsum.photos/500/500?random=8",
      categoryAddress: "Shoes",
    },
    {
      name: "Accessories",
      image: "https://picsum.photos/500/500?random=9",
      categoryAddress: "Accessories",
    },
    {
      name: "Tracksuits",
      image: "https://picsum.photos/500/500?random=10",
      categoryAddress: "Tracksuits",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      {/* Search Input */}
      <form onSubmit={handleSearch}>
        <div className="mb-6">
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            type="text"
            placeholder="Search categories..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </form>

      {/* Scrollable Row */}
      <div className="overflow-x-auto">
        <div className="flex space-x-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/collections/all/?search=${cat.categoryAddress}`}
              className="flex flex-col items-center min-w-[100px] group"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-gray-300 shadow-sm group-hover:border-black transition">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-800 group-hover:text-black transition text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
