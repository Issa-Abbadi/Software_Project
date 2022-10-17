import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Products from "../components/Products";
import Filtering_in_PLP from "../components/filtering_in_PLP";
function KitchenProducts(props) {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState(props.props.type);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [stores, setStores] = useState([]);
  const [sorting, setSorting] = useState([]);
  let filterData, sortedData;
  const navigate = useNavigate();
  useEffect(() => {
    setProducts([]);
    axios
      .get("http://localhost:4000/Products/kitchen/")
      .then(({ data }) => {
        if (type === "0") {
          filterData = data;
          setProducts(data);
        } else if (type === "1") {
          filterData = productsFilterType(data, "رفايع المطبخ");
          setProducts(filterData);
        } else if (type === "2") {
          filterData = productsFilterType(data, "أواني الطبخ");
          setProducts(filterData);
        } else if (type === "3") {
          filterData = productsFilterType(data, "توزيع وتوابل");
          setProducts(filterData);
        } else {
          setProducts(data);
        }
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
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
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
      if (product.contain_colors[0] != null) {
        for (let j = 0; j < product.contain_colors.length; j++) {
          for (let i = 0; i < colors.length; i++) {
            if (product.contain_colors[j].color == colors[i]) {
              return product;
            }
          }
        }
      } else {
      }
    });
    console.log("COLO RED", filteredData);
    setProducts(filteredData);
    return filteredData;
  };
  const productsFilterSize = (data) => {
    filteredData = data.filter((product) => {
      if (product.sizes[0] != null) {
        for (let j = 0; j < product.sizes.length; j++) {
          for (let i = 0; i < sizes.length; i++) {
            if (product.sizes[j].size == sizes[i]) {
              return product;
            }
          }
        }
      } else {
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
    console.log("COLO RED", filteredData);
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
    console.log("FILTER", res);
    console.log(Object.is(products, products));
    console.log("state", products);
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
export default KitchenProducts;
