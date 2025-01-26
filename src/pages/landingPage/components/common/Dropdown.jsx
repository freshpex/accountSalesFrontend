import { useState } from "react";

export default function Dropdown({ dropdownExtraClasses, setFilterType }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`relative ${dropdownExtraClasses}`}>
            <button
                aria-label="dropdown button for selecting filter type"
                aria-controls="dropdown-menu"
                aria-expanded={isExpanded}
                onClick={() => setIsExpanded(!isExpanded)}
                className={`shrink-0 font-medium leading-4 px-5 py-[10px] rounded-full flex items-center gap-2 transition-all duration-300 delay-300 ${isExpanded ? 'bg-primary text-neutral-100' : 'bg-neutral-300 text-primary'}`}
            >
                <svg className={`delay-300 ${isExpanded ? 'fill-neutral-100' : 'fill-primary'}`} viewBox="0 0 100 100" width="25" height="25">
                    {
                        [
                            {
                                x: 0,
                                y: isExpanded ? 50 : 25,
                                width: 100,
                                height: 10
                            },
                            {
                                x: 17,
                                y: 50,
                                width: 66,
                                height: 10
                            },
                            {
                                x: 38,
                                y: isExpanded ? 50 : 75,
                                width: 24,
                                height: 10
                            }
                        ].map(({ x, y, width, height }, index) =>
                            <rect
                                key={index}
                                className="origin-center transition-all duration-300"
                                width={width}
                                height={height}
                                x={x}
                                y={y}>
                            </rect>
                        )
                    }
                </svg>
                <span>All Filters</span>
            </button>

            <div
                aria-label="dropdown menu"
                className={`absolute top-14 left-1/2 -ml-20 z-[2] bg-neutral-100 transition-all duration-300 shadow-lg rounded-xl w-40 overflow-hidden ${isExpanded ? 'visible opacity-100' : 'opacity-0 invisible'}`}
            >
                <ul className="text-primary font-medium leading-4 text-start divide-y divide-primary/5">
                    {
                        [
                            'All Categories',
                            'Art',
                            'Celebrities',
                            'Gaming',
                            'Sport',
                            'Music',
                            'Crypto'
                        ].map((filterText, index) =>
                            <li key={index}>
                                <span
                                    onClick={() => setFilterType(filterText)}
                                    aria-labelledby="filter select button"
                                    className="block py-3 px-5 hover:bg-primary/5 cursor-pointer">
                                    {filterText}
                                </span>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}
