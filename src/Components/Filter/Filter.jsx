import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SFilter from "./Filter.styles";
import axios from "axios";

const Filter = (props) => {
  const [filters, setFilters] = useState();
  const [toggleOpen, setToggleOpen] = useState(false);
  const [renderFilters, setRenderFilters] = useState();
  const getFilters = useCallback(async () => {
    const response = await axios.get("http://localhost:3001/api/filters");
    setFilters(response.data);
  }, []);

  useEffect(() => {
    getFilters();
  }, [getFilters]);
  const updateFilters = (e) => {
    const name = e.target.dataset.name;
    const getFilters = filters[0][name]
      .slice(0, 57)
      .sort()
      .map((data, index) => {
        return (
          <button
            key={`${data}-${index}`}
            data-name={name}
            data-filter={data}
            onClick={(e) => filterData(e)}
          >
            {data
              .toString()
              .charAt(0)
              .toUpperCase()
              .concat(data.toString().slice(1)) || "Others"}
          </button>
        );
      });
    setRenderFilters(getFilters);
  };

  const filterData = (e) => {
    setToggleOpen(!toggleOpen);
    const { name, filter } = e.target.dataset;
    const newData = props.data.filter((d) => {
      return (
        d[name === "Year" ? "end_year" : name.toLowerCase()].toString() ===
        filter
      );
    });
    props.handleFilters(newData);
  };
  return (
    <SFilter>
      <button onClick={() => setToggleOpen(!toggleOpen)}>Filter</button>
      <AnimatePresence>
        {toggleOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.5 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: 0 }}
            className="filters-wrapper"
          >
            <div className="filters-navigation">
              {Object.keys(filters[0])
                .slice(1)
                .map((d, index) => {
                  return (
                    <div
                      key={index}
                      data-name={d}
                      onClick={(e) => updateFilters(e)}
                    >
                      {d === "Year" ? "End Year" : d}
                      <button
                        data-name={d}
                        onMouseEnter={(e) => updateFilters(e)}
                      >
                        {">"}
                      </button>
                    </div>
                  );
                })}
            </div>
            <div>{renderFilters}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => {
          props.handleFilters(props.data);
        }}
      >
        Reset Filters
      </button>
    </SFilter>
  );
};

export default Filter;
