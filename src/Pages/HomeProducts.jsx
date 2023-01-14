import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Products from "../components/Products";
import Filtering_in_PLP from "../components/filtering_in_PLP";

function HomeProducts(props) {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState(props.props.type);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [stores, setStores] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState(localStorage.getItem("search"));
  let filterData, sortedData;
  const navigate = useNavigate();
  useEffect(() => {
    setProducts([]);
    axios
      .get("http://localhost:4000/Products/home/")
      .then(({ data }) => {
        if (type === "0") {
          filterData = data;
          setProducts(data);
        } else if (type === "1") {
          filterData = productsFilterType(data, "رفايع الحمام");
          setProducts(filterData);
        } else {
          setProducts(data);
        }

        filterData = filterData.filter((product) => {
          if (search === "" || search === null) {
            console.log("No td");
            return product;
          } else if (
            product.product_name.toLowerCase().includes(search.toLowerCase())
          ) {
            console.log("feilterdd");
            return product;
          }
        });
        setProducts(filterData);
        sortedData = filterData;
        if (colors[0] != null) {
          sortedData = productsFilterColor(filterData);
        }
        if (sizes[0] != null) {
          sortedData = productsFilterSize(sortedData);
        }
        if (stores[0] != null) {
          sortedData = productsFilterStore(sortedData);
        }
        if (sorting[0] != null) {
          productsSorting(sorting, sortedData);
        } else {
          //setProducts(filterData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [type, colors, sorting, sizes, stores]);

  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    if (property === "product_price" || property === "-product_price") {
      console.log("price");
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result =
          a.vars[0].price < b.vars[0].price
            ? -1
            : a.vars[0].price > b.vars[0].price
            ? 1
            : 0;
        return result * sortOrder;
      };
    } else {
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    }
  }
  const handleSorting = (selected) => {
    setSorting(selected.value);
  };
  const handleColors = (selected) => {
    setColors(
      selected.map((color) => {
        return color.value;
      })
    );
  };
  const handleSizes = (selected) => {
    setSizes(
      selected.map((color) => {
        return color.value;
      })
    );
  };
  const handleStores = (selected) => {
    setStores(
      selected.map((color) => {
        return color.value;
      })
    );
  };
  let filteredData;
  const productsFilterType = (data, filter) => {
    filteredData = data.filter(function (product) {
      return product.sub_category == filter;
    });
    return filteredData;
  };
  const productsFilterColor = (data) => {
    filteredData = data.filter((product) => {
      if (product.vars[0] != null) {
        for (let j = 0; j < product.vars.length; j++) {
          if (product.vars[j] !== null)
            for (let i = 0; i < colors.length; i++) {
              if (product.vars[j].color == colors[i]) {
                return product;
              }
            }
        }
      } else if (product.product_color != null) {
        for (let i = 0; i < colors.length; i++) {
          if (product.product_color == colors[i]) {
            return product;
          }
        }
      }
    });
    //console.log("COLO RED", filteredData);
    setProducts(filteredData);
    return filteredData;
  };
  const productsFilterSize = (data) => {
    filteredData = data.filter((product) => {
      if (product.vars[0] != null) {
        for (let j = 0; j < product.vars.length; j++) {
          if (product.vars[j] !== null)
            for (let i = 0; i < sizes.length; i++) {
              if (product.vars[j].size == sizes[i]) {
                return product;
              }
            }
        }
      } else if (product.product_color != null) {
        for (let i = 0; i < sizes.length; i++) {
          if (product.product_size == sizes[i]) {
            return product;
          }
        }
      }
    });
    console.log("COLO RED", filteredData);
    setProducts(filteredData);
    return filteredData;
  };
  const productsFilterStore = (data) => {
    filteredData = data.filter((product) => {
      if (product.product_company[0] != null) {
        for (let i = 0; i < stores.length; i++) {
          if (product.product_company == stores[i]) {
            return product;
          }
        }
      } else {
      }
    });
    //console.log("COLO RED", filteredData);
    setProducts(filteredData);
    return filteredData;
  };
  const productsSorting = (filter, data) => {
    setProducts([]);
    const res = [...data];
    if (filter === "low-to-high") res.sort(dynamicSort("product_price"));
    else if (filter === "high-to-low") res.sort(dynamicSort("-product_price"));
    else if (filter === "customer-rating")
      res.sort(dynamicSort("-product_rating"));
    else if (filter === "Newest") res.sort(dynamicSort("-created_on"));
    //console.log("FILTER", res);
    // console.log(Object.is(products, products));
    // console.log("state", products);
    setProducts([].concat(res));
  };
  return (
    <>
      <Filtering_in_PLP
        handleColors={handleColors}
        handleSorting={handleSorting}
        handleSizes={handleSizes}
        handleStores={handleStores}
      />
      <Products products={products} />
    </>
  );
}
export default HomeProducts;
