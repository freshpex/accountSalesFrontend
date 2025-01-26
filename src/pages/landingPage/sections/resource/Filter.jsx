import { useState } from "react";
import Dropdown from "../../components/common/Dropdown";

export default function Filter() {
  const [filterType, setFilterType] = useState("All Categories");
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="relative flex max-[340px]:flex-wrap justify-center min-[340px]:justify-between items-center tablet:items-start gap-6 tablet:gap-32">
      <span
        aria-label="filter type badge"
        className="tablet:hidden font-medium leading-4 px-5 py-[10px] text-neutral-100 bg-primary rounded-full cursor-pointer"
      >
        {filterType}
      </span>

      <div
        aria-label="filter category"
        className="max-tablet:hidden flex flex-wrap items-center gap-x-3 gap-y-5"
      >
        {[
          "All Accounts",
          "Instagram",
          "TikTok",
          "YouTube",
          "Facebook",
          "Twitter",
        ].map((filterText, index) => (
          <span
            key={index}
            onClick={() => setFilterType(filterText)}
            className={`block leading-4 font-medium px-5 py-[10px] transition-all ${isOpened ? "invisible opacity-0" : "visible opacity-100"} ${filterType === filterText ? "bg-primary hover:bg-primary/90 text-neutral-100" : "bg-neutral-300 hover:bg-neutral-400 text-primary"} rounded-full active:scale-95 cursor-pointer`}
          >
            {filterText}
          </span>
        ))}
      </div>

      <button
        onClick={() => setIsOpened(!isOpened)}
        aria-label="filter toggle button for all filter type visibility"
        aria-controls="filter-category"
        aria-expanded={isOpened}
        className={`max-tablet:hidden shrink-0 font-medium leading-4 px-5 py-[10px] rounded-full flex items-center gap-2 transition-all duration-300 delay-300 ${isOpened ? "bg-primary text-neutral-100 " : "bg-neutral-300 text-primary"}`}
      >
        <svg
          className={`delay-300 ${isOpened ? "fill-neutral-100" : "fill-primary"}`}
          viewBox="0 0 100 100"
          width="25"
          height="25"
        >
          {[
            {
              x: 0,
              y: isOpened ? 25 : 50,
              width: 100,
              height: 10,
            },
            {
              x: 17,
              y: 50,
              width: 66,
              height: 10,
            },
            {
              x: 38,
              y: isOpened ? 75 : 50,
              width: 24,
              height: 10,
            },
          ].map(({ x, y, width, height }, index) => (
            <rect
              key={index}
              className="origin-center transition-all duration-300"
              width={width}
              height={height}
              x={x}
              y={y}
            ></rect>
          ))}
        </svg>

        <span>All Filters</span>
      </button>

      <Dropdown
        setFilterType={setFilterType}
        dropdownExtraClasses="tablet:hidden"
      />
    </div>
  );
}
